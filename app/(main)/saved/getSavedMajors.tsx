'use server'

import prisma from '@/prisma/client'

export const getSavedMajors = async (slugs: string[]) => {
	const likedMajors = await prisma.major.findMany({
		where: {
			slug: {
				in: slugs
			}
		},
		select: {
			name: true,
			slug: true,
			isOnline: true,
			majorLevel: true,
			unit: {
				select: {
					name: true
				}
			},
			qualifications: {
				select: {
					name: true,
					slug: true
				}
			}
		}
	})

	return likedMajors
}
