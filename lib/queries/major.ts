import prisma from '@/prisma/client'
import { Major, MajorLevel, Prisma, Qualification, Subscription, Unit } from '@prisma/client'
import { isEmpty } from '../utils'

// ================== MAJOR SEARCH ==================

type MajorSearchInput = {
	orderBy: {
		[key: string]: string
	}
	majorLevel: MajorLevel[] | MajorLevel | undefined
	isOnline: boolean | undefined
	searchQuery: string | undefined
	minPrice: string
	maxPrice: string
	qualifications: number[] | undefined
	isRegulated: boolean | undefined
	canPayInInstallments: boolean | undefined
	cities: number[] | undefined
	voivodeships: number[] | undefined
	units: number[] | undefined
	limit: number
	offset: number
}

export type MajorSearchResults = (Pick<Major, 'name' | 'cost' | 'isOnline' | 'majorLevel' | 'slug'> & {
	unit: Pick<Unit, 'name'> & {
		subscriptions: Pick<Subscription, 'type'>[]
	}
	qualifications: Pick<Qualification, 'name' | 'slug'>[]
})[]

export const getMajorSearchResults = async ({
	orderBy,
	majorLevel,
	isOnline,
	searchQuery,
	minPrice,
	maxPrice,
	qualifications,
	isRegulated,
	canPayInInstallments,
	cities,
	voivodeships,
	units,
	limit,
	offset
}: MajorSearchInput): Promise<{
	data: { premium: MajorSearchResults; standard: MajorSearchResults }
	pagination: any
}> => {
	const baseQuery: Prisma.MajorFindManyArgs = {
		orderBy: orderBy,
		where: {
			majorLevel: {
				in: typeof majorLevel === 'string' ? [majorLevel] : majorLevel
			},
			status: 'PUBLISHED',
			isOnline: isOnline,
			OR: [
				{
					name: {
						contains: searchQuery || undefined,
						mode: 'insensitive'
					}
				},
				{
					keywords: {
						hasSome: searchQuery?.split('_') || []
					}
				},
				{
					unit: {
						name: {
							contains: searchQuery || undefined,
							mode: 'insensitive'
						}
					}
				},
				{
					qualifications: {
						some: {
							OR: [
								{
									name: {
										contains: searchQuery || undefined,
										mode: 'insensitive'
									}
								},
								{
									keywords: {
										hasSome: searchQuery?.split('_') || []
									}
								}
							]
						}
					}
				}
			],
			AND: {
				// Pass the test if cost is null
				OR: [
					{
						cost: null
					},
					{
						cost: {
							gte: typeof minPrice === 'string' ? Number(minPrice) : 0,
							lte: typeof maxPrice === 'string' ? Number(maxPrice) : undefined
						}
					}
				]
			},
			qualifications: {
				some: {
					id: {
						in: (qualifications?.map(q => Number(q) || undefined).filter(q => q) as number[]) ?? undefined
					}
				}
			},
			isRegulated: isRegulated || undefined,
			canPayInInstallments: canPayInInstallments || undefined,
			unit: {
				id: {
					in: units
				},
				city: {
					id: {
						in: cities
					},
					voivodeship: {
						id: {
							in: voivodeships
						}
					}
				}
			}
		},
		select: {
			slug: true,
			name: true,
			isOnline: true,
			majorLevel: true,
			qualifications: {
				select: {
					name: true,
					slug: true
				}
			},
			cost: true,
			unit: {
				select: {
					name: true,
					subscriptions: {
						select: {
							to: true,
							type: true
						},
						where: {
							to: {
								gte: new Date()
							},
							type: {
								in: ['STANDARD', 'PREMIUM']
							}
						}
					}
				}
			}
		},
		take: limit,
		skip: offset
	}

	const premiumQuery: Prisma.MajorFindManyArgs = {
		...baseQuery,
		where: {
			...baseQuery.where,
			unit: {
				subscriptions: {
					some: {
						to: {
							gt: new Date()
						},
						type: 'PREMIUM'
					}
				}
			}
		}
	}

	const nonPremiumQuery: Prisma.MajorFindManyArgs = {
		...baseQuery,
		where: {
			...baseQuery.where,
			NOT: {
				unit: {
					subscriptions: {
						some: {
							to: {
								gt: new Date()
							},
							type: 'PREMIUM'
						}
					}
				}
			}
		}
	}

	const [premiumMajors, premiumCount] = await prisma.$transaction([
		prisma.major.findMany(premiumQuery),
		prisma.major.count({ where: premiumQuery.where })
	])

	// Calculate remaining offset for non-premium majors after accounting for premium majors
	const remainingOffset = Math.max(offset - premiumCount, 0)
	const remainingLimit = limit - premiumMajors.length

	let nonPremiumMajors: MajorSearchResults = []
	let nonPremiumCount = 0

	if (remainingLimit > 0) {
		nonPremiumMajors = (await prisma.major.findMany({
			...nonPremiumQuery,
			take: remainingLimit,
			skip: remainingOffset
		})) as any
		nonPremiumCount = await prisma.major.count({ where: nonPremiumQuery.where })
	}

	const totalCount = premiumCount + nonPremiumCount

	if (isEmpty(orderBy)) {
		nonPremiumMajors = nonPremiumMajors.sort((a, b) => {
			const aHasActiveSubscription = a.unit.subscriptions.length > 0
			const bHasActiveSubscription = b.unit.subscriptions.length > 0

			if (aHasActiveSubscription && !bHasActiveSubscription) {
				return -1
			} else if (!aHasActiveSubscription && bHasActiveSubscription) {
				return 1
			} else {
				return 0
			}
		})
	}

	return {
		pagination: {
			total: totalCount
		},
		data: {
			premium: premiumMajors as any,
			standard: nonPremiumMajors
		}
	}
}

// ================== SIMILIAR MAJORS ==================

type GetSimiliarMajorsInput = {
	currentMajor: {
		qualificationIds: number[]
		keywords: string[]
		name: string
		id: number
	}
	take?: number
}

export type SimiliarMajor = Pick<Major, 'majorLevel' | 'keywords' | 'isOnline' | 'id' | 'name' | 'slug'> & {
	unit: { name: string; subscriptions: { type: string }[] }
	qualifications: Pick<Qualification, 'slug' | 'name' | 'id'>[]
}

export const getSimiliarMajors = async ({
	currentMajor,
	take = 10
}: GetSimiliarMajorsInput): Promise<SimiliarMajor[]> => {
	const { qualificationIds, keywords, name, id } = currentMajor

	const similarMajors = await prisma.major.findMany({
		where: {
			OR: [
				{ qualifications: { some: { id: { in: qualificationIds.map(q => q) } } } },
				{ keywords: { hasSome: keywords } },
				{
					name: {
						in: name.split(' ').map(word => word.toLowerCase()),
						mode: 'insensitive'
					}
				}
			],
			NOT: {
				id: { equals: id }
			}
		},
		select: {
			id: true,
			name: true,
			majorLevel: true,
			isOnline: true,
			slug: true,
			keywords: true,
			qualifications: {
				select: {
					id: true,
					slug: true,
					name: true
				}
			},
			unit: {
				select: {
					name: true,
					subscriptions: {
						where: {
							to: {
								gte: new Date()
							},
							type: {
								in: ['PREMIUM', 'STANDARD']
							}
						},
						select: {
							type: true
						}
					}
				}
			}
		},
		orderBy: [
			{
				unit: {
					subscriptions: {
						_count: 'desc'
					}
				}
			}
		],
		take: take
	})

	return similarMajors
}
