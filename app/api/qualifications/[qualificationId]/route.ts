import prisma from '@/prisma/client'
import { z } from 'zod'

export async function DELETE(req: Request, { params }: { params: { qualificationId: string } }) {
	try {
		const id = parseInt(params.qualificationId)

		const qualificationToDelete = await prisma.qualification.findFirst({
			where: {
				id: id
			}
		})

		if (!qualificationToDelete) {
			return new Response('Could not find qualification to delete', { status: 404 })
		}

		await prisma.qualification.delete({
			where: {
				id: id
			}
		})

		return new Response('OK')
	} catch (error) {
		if (error instanceof z.ZodError) {
			return new Response('Invalid DELETE request data passed', { status: 422 })
		}

		return new Response('Could not delete this qualification, please try again.', { status: 500 })
	}
}
