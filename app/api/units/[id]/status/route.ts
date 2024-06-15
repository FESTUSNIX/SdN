import prisma from '@/prisma/client'
import { z } from 'zod'

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
	try {
		const body = await req.json()
		const id = parseInt(params.id)

		const { workStatus } = z
			.object({
				workStatus: z.enum(['FINISHED', 'IN_PROGRESS', 'TO_CHECK'])
			})
			.parse(body)

		const updateStatus = await prisma.unit.update({
			where: {
				id: id
			},
			data: {
				workStatus: workStatus
			}
		})

		return new Response('OK')
	} catch (error) {
		if (error instanceof z.ZodError) {
			return new Response('Invalid PATCH request data passed', { status: 422 })
		}

		return new Response('Could not update work status, please try again.', { status: 500 })
	}
}
