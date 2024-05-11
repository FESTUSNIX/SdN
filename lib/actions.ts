'use server'

import prisma from '@/prisma/client'

export const getUnitSelectOptions = async () => {
	const units = await prisma.unit.findMany({
		select: {
			id: true,
			name: true
		}
	})

	return units.map(unit => ({
		value: unit.id.toString(),
		label: unit.name
	}))
}
