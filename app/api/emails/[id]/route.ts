import prisma from '@/prisma/client'
import { z } from 'zod'

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
	try {
		const id = parseInt(params.id)

		await prisma.unitEmail.delete({
			where: {
				id: id
			}
		})

		return new Response('OK')
	} catch (error) {
		if (error instanceof z.ZodError) {
			return new Response('Invalid DELETE request data passed', { status: 422 })
		}

		return new Response('Could not delete this email, please try again.', { status: 500 })
	}
}
