import prisma from '@/prisma/client'

export async function getUnits() {
	try {
		const data = await prisma.unit.findMany({
			include: {
				majors: {
					select: {
						id: true,
						unitId: true,
						name: true
					}
				},
				city: {
					select: {
						id: true,
						name: true
					}
				}
			}
		})

		return { units: data }
	} catch (error) {
		return { error }
	}
}
