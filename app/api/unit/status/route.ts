import prisma from '@/prisma/client'
import { z } from 'zod'

export async function PATCH(req: Request) {
	try {
		const body = await req.json()

		const { id, status } = z
			.object({
				id: z.number(),
				status: z.enum(['FINISHED', 'IN_PROGRESS'])
			})
			.parse(body)

		const updateStatus = await prisma.unit.update({
			where: {
				id: id
			},
			data: {
				status: status
			}
		})

		return new Response('OK')
	} catch (error) {
		if (error instanceof z.ZodError) {
			return new Response('Invalid PATCH request data passed', { status: 422 })
		}

		return new Response('Could not update status, please try again.', { status: 500 })
	}
}
