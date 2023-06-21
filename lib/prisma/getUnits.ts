import prisma from '@/prisma/client'

export async function getUnits() {
	try {
		const units = await prisma.unit.findMany({
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

		return { units }
	} catch (error) {
		return { error }
	}
}
