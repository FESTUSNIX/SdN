import { UnitValidator } from '@/lib/validators/unit'
import prisma from '@/prisma/client'
import { z } from 'zod'

export async function GET(req: Request) {
	try {
		const units = await prisma.unit.findMany({
			select: {
				id: true,
				name: true,
				slug: true
			}
		})

		if (!units) return new Response('Units not found', { status: 404 })

		return new Response(JSON.stringify(units))
	} catch (error) {
		if (error instanceof z.ZodError) {
			return new Response('Invalid request data passed', { status: 422 })
		}

		return new Response('Could not fetch units', { status: 500 })
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

		// TODO: It's a temporary solution, handle it better in the future
		const latestUnit = await prisma.unit.findFirst({
			orderBy: {
				id: 'desc'
			},
			select: {
				id: true
			}
		})

		const newId = (latestUnit?.id ?? 0) + 1

		const unit = await prisma.unit.upsert({
			where: {
				id: newId
			},
			create: {
				id: newId,
				name: data.name,
				logo: null,
				email: data.email,
				phone: data.phone ?? null,
				cityId: data.cityId,
				isPublic: data.isPublic,
				unitType: data.unitType,
				website: data.website,
				nip: data.nip ?? null,
				regon: data.regon ?? null,
				notes: data.notes ?? '',
				address: {
					create: {
						street: data.street ?? '',
						postalCode: data.postalCode ?? ''
					}
				},
				workStatus: data.workStatus ?? 'IN_PROGRESS'
			},
			update: {
				notes: `DEV: TRIED TO UPSERT AS ${data.name}`
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
		console.log('ERROR', error)

		if (error instanceof z.ZodError) {
			return new Response('Invalid POST request data passed', { status: 422 })
		}

		return new Response('Could not create a new unit', { status: 500 })
	}
}
