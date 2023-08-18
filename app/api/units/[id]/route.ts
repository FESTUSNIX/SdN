import prisma from '@/prisma/client'
import { UnitValidator } from '@/lib/validators/unit'
import { z } from 'zod'

export async function GET(req: Request, { params }: { params: { id: string } }) {
	try {
		const id = params.id

		const unit = await prisma.unit.findFirst({
			where: {
				id: parseInt(id)
			},
			include: {
				address: {
					select: {
						street: true,
						postalCode: true
					}
				}
			}
		})

		if (!unit) return new Response('Unit not found', { status: 404 })

		return new Response(JSON.stringify(unit))
	} catch (error) {
		if (error instanceof z.ZodError) {
			return new Response('Invalid request data passed', { status: 422 })
		}

		return new Response('Could not fetch unit', { status: 500 })
	}
}

export async function POST(req: Request) {
	try {
		const body = await req.json()

		const data = UnitValidator.parse(body)

		const unitExists = await prisma.unit.findFirst({
			where: {
				name: data.name
			}
		})

		if (unitExists) {
			return new Response('Unit already exists', { status: 409 })
		}

		const unit = await prisma.unit.create({
			data: {
				name: data.name,
				logo: null,
				email: data.email,
				phone: data.phone ?? '',
				cityId: data.cityId,
				isPublic: data.isPublic,
				unitType: data.unitType,
				website: data.website,
				nip: data.nip,
				regon: data.regon,
				notes: data.notes,
				address: {
					create: {
						street: data.street ?? '',
						postalCode: data.postalCode ?? '',
						cityId: data.cityId
					}
				},
				status: data.status
			}
		})

		if (data.logo) {
			await prisma.unit.update({
				where: {
					id: unit.id
				},
				data: {
					logo: `${unit.id}/unit-logo`
				}
			})
		}

		return new Response(unit.id.toString())
	} catch (error) {
		if (error instanceof z.ZodError) {
			return new Response('Invalid POST request data passed', { status: 422 })
		}

		return new Response('Could not create a new unit', { status: 500 })
	}
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
	try {
		const id = params.id

		const unitToDelete = await prisma.unit.findFirst({
			where: {
				id: parseInt(id)
			}
		})

		if (!unitToDelete) {
			return new Response('Could not find unit to delete', { status: 404 })
		}

		await prisma.unit.delete({
			where: {
				id: parseInt(id)
			}
		})

		return new Response('OK')
	} catch (error) {
		if (error instanceof z.ZodError) {
			return new Response('Invalid PATCH request data passed', { status: 422 })
		}

		return new Response('Could not delete this unit, please try again.', { status: 500 })
	}
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
	try {
		const id = params.id
		const body = await req.json()

		const {
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
				id: parseInt(id)
			}
		})

		if (!unitToUpdate) {
			return new Response('Could not find unit to update', { status: 404 })
		}

		await prisma.unit.update({
			where: {
				id: parseInt(id)
			},
			data: {
				status: status,
				name: name,
				logo: logo,
				phone: phone ?? '',
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
