import { City, Major, Unit, Voivodeship } from '@prisma/client'
import getBaseURL from '../utils/getBaseURL'
import prisma from '@/prisma/client'

export async function getUnit(id: number) {
	try {
		const unit = await prisma.unit.findFirst({
			where: {
				id: Number(id)
			},
			include: {
				city: {
					select: {
						id: true,
						name: true,
						voivodeship: true
					}
				},
				majors: {
					select: {
						id: true,
						name: true,
						unitId: true
					}
				},
				address: {
					select: {
						id: true,
						street: true,
						city: true,
						postalCode: true
					}
				}
			}
		})
		console.log('UNIT ===', unit)
		return { unit: unit }
	} catch (error) {
		return { error }
	}
}
