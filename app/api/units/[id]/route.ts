import prisma from '@/prisma/client'
import { UnitValidator } from '@/lib/validators/unit'
import { z } from 'zod'
import { getAuthSession } from '@/lib/auth/auth'

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

		const session = await getAuthSession()
		if (!session) {
			return new Response('Not authenticated', { status: 401 })
		}

		const unitToUpdate = await prisma.unit.findFirst({
			where: {
				id: parseInt(id)
			},
			select: {
				managers: {
					select: {
						id: true
					}
				}
			}
		})

		if (!unitToUpdate) {
			return new Response('Could not find unit to update', { status: 404 })
		}

		if (!(session.user.role === 'ADMIN' || unitToUpdate.managers.some(m => m.id === session.user.id))) {
			return new Response('Not authenticated', { status: 403 })
		}

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
		} = UnitValidator.partial().parse(body)

		await prisma.unit.update({
			where: {
				id: parseInt(id)
			},
			data: {
				status: status,
				name: name,
				logo: logo,
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
							street: street,
							postalCode: postalCode
						},
						update: {
							street: street,
							postalCode: postalCode
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
