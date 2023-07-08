import prisma from '@/prisma/client'
import { z } from 'zod'

export async function GET(req: Request) {
	try {
		const { searchParams } = new URL(req.url)
		const id = z.coerce.number().parse(searchParams.get('id'))

		const unit = await prisma.unit.findFirst({
			where: {
				id: id
			},
			select: {
				id: true,
				name: true,
				website: true,
				unitType: true
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
