import prisma from '@/prisma/client'
import { z } from 'zod'

export async function GET(req: Request, { params }: { params: { id: string } }) {
	try {
		const id = parseInt(params.id)

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
