import prisma from '@/prisma/client'
import { Major, MajorLevel, Prisma, Qualification } from '@prisma/client'

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
}: MajorSearchInput) => {
	const query: Prisma.MajorFindManyArgs = {
		orderBy,
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
					name: true
				}
			}
		},
		take: limit,
		skip: offset
	}
	const [majors, count] = await prisma.$transaction([
		prisma.major.findMany(query),
		prisma.major.count({ where: query.where })
	])

	return {
		pagination: {
			total: count
		},
		data: majors as unknown as {
			name: string
			cost: number
			isOnline: boolean
			majorLevel: MajorLevel
			slug: string
			unit: {
				name: string
			}
			qualifications: {
				name: string
				slug: string
			}[]
		}[]
	}
}

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
