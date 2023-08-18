import prisma from '@/prisma/client'
import { z } from 'zod'

export async function GET(req: Request) {
	try {
		const unit = await prisma.unit.findMany({
			select: {
				id: true,
				name: true,
				slug: true
			}
		})

		if (!unit) return new Response('Units not found', { status: 404 })

		return new Response(JSON.stringify(unit))
	} catch (error) {
		if (error instanceof z.ZodError) {
			return new Response('Invalid request data passed', { status: 422 })
		}

		return new Response('Could not fetch unit', { status: 500 })
	}
}
