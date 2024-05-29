'use server'

import prisma from '@/prisma/client'

export const removeAllMajorsFromUnit = async (unitId: number, unitSlug: string) => {
	try {
		await prisma.major.deleteMany({
			where: {
				unitId: unitId,
				unitSlug: unitSlug
			}
		})
	} catch (error) {
		console.log(error)
		throw new Error('Failed to remove all majors from unit')
	}
}
