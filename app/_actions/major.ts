import prisma from '@/prisma/client'
import { MajorLevel, Prisma } from '@prisma/client'

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
	limit,
	offset
}: MajorSearchInput) => {
	const query: Prisma.MajorFindManyArgs = {
		orderBy,
		where: {
			majorLevel: {
				in: typeof majorLevel === 'string' ? [majorLevel] : majorLevel
			},
			isOnline: isOnline,
			OR: [
				{
					name: {
						contains: searchQuery,
						mode: 'insensitive'
					}
				},
				{
					unit: {
						name: {
							contains: searchQuery,
							mode: 'insensitive'
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
							gte: typeof minPrice === 'string' ? Number(minPrice) : undefined,
							lte: typeof maxPrice === 'string' ? Number(maxPrice) : undefined
						}
					}
				]
			},
			qualifications: {
				some: {
					id: {
						in: qualifications
					}
				}
			},
			isRegulated: isRegulated || undefined,
			canPayInInstallments: canPayInInstallments || undefined,
			unit: {
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
