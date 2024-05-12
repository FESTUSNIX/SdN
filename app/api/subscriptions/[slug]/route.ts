import prisma from '@/prisma/client'
import { z } from 'zod'

export async function DELETE(req: Request, { params: { slug } }: { params: { slug: string } }) {
	try {
		const subscriptionToDelete = await prisma.subscription.findFirst({
			where: { slug }
		})

		if (!subscriptionToDelete) {
			return new Response('Could not find subscription to delete', { status: 404 })
		}

		await prisma.subscription.delete({
			where: { slug }
		})

		return new Response('OK')
	} catch (error) {
		if (error instanceof z.ZodError) {
			return new Response('Invalid DELETE request data passed', { status: 422 })
		}

		return new Response('Could not delete this subscription, please try again.', { status: 500 })
	}
}
