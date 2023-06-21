import prisma from '@/prisma/client'

export async function getCities() {
	try {
		const cities = await prisma.city.findMany({
			orderBy: {
				name: 'asc'
			},
			select: {
				id: true,
				name: true
			}
		})

		return { cities }
	} catch (error) {
		return { error }
	}
}
