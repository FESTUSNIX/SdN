import prisma from '@/prisma/client'
import { z } from 'zod'

export async function PATCH(req: Request, { params }: { params: { majorId: string } }) {
	try {
		const body = await req.json()
		const id = parseInt(params.majorId)

		const { status } = z
			.object({
				status: z.enum(['FINISHED', 'IN_PROGRESS', 'TO_CHECK'])
			})
			.parse(body)

		const updateStatus = await prisma.major.update({
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
