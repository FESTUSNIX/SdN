import prisma from '@/prisma/client'
import { NextRequest } from 'next/server'
import { z } from 'zod'

export async function PATCH(req: NextRequest) {
	try {
		const body = await req.json()

		const { id, slug } = body

		const update = await prisma.qualification.update({
			where: {
				id: id
			},
			data: {
				slug: slug
			}
		})

		return new Response('OK')
	} catch (error) {
		if (error instanceof z.ZodError) {
			return new Response('Invalid PATCH request data passed', { status: 422 })
		}

		return new Response('Could not update this qualification, please try again.', { status: 500 })
	}
}
