import prisma from '@/prisma/client'

export async function getUnits() {
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

	return units
}
