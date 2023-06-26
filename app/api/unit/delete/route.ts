import prisma from '@/prisma/client'
import { z } from 'zod'

export async function DELETE(req: Request) {
	try {
		const body = await req.json()

		const id = z.number().parse(body)

		const unitToDelete = await prisma.unit.findFirst({
			where: {
				id: id
			}
		})

		if (!unitToDelete) {
			return new Response('Could not find unit to delete', { status: 404 })
		}

		await prisma.unit.delete({
			where: {
				id: id
			}
		})

		return new Response('OK')
	} catch (error) {
		if (error instanceof z.ZodError) {
			return new Response('Invalid PATCH request data passed', { status: 422 })
		}

		return new Response('Could not delete this unit, please try again.', { status: 500 })
	}
}
