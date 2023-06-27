import { UnitValidator } from '@/lib/validators/unit'
import prisma from '@/prisma/client'
import { z } from 'zod'

export async function PATCH(req: Request) {
	try {
		const body = await req.json()

		const {
			id,
			unitType,
			cityId,
			email,
			phone,
			isPublic,
			name,
			status,
			website,
			logo,
			nip,
			notes,
			postalCode,
			regon,
			street
		} = UnitValidator.parse(body)

		const unitToUpdate = await prisma.unit.findFirst({
			where: {
				id: id
			}
		})

		if (!unitToUpdate) {
			return new Response('Could not find unit to update', { status: 404 })
		}

		await prisma.unit.update({
			where: {
				id: id
			},
			data: {
				status: status,
				name: name,
				// logo: logo,
				phone: phone,
				email: email,
				cityId: cityId,
				isPublic: isPublic,
				unitType: unitType,
				website: website,
				nip: nip,
				regon: regon,
				notes: notes,
				address: {
					upsert: {
						create: {
							street: street ?? '',
							postalCode: postalCode ?? '',
							cityId: cityId
						},
						update: {
							street: street ?? '',
							postalCode: postalCode ?? '',
							cityId: cityId
						}
					}
				}
			}
		})

		return new Response('OK')
	} catch (error) {
		if (error instanceof z.ZodError) {
			return new Response('Invalid PATCH request data passed', { status: 422 })
		}

		return new Response('Could not update this unit, please try again.', { status: 500 })
	}
}
