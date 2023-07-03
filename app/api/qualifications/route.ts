import prisma from '@/prisma/client'
import { z } from 'zod'

export async function GET(req: Request) {
	try {
		const qualifications = await prisma.qualification.findMany()

		return new Response(JSON.stringify(qualifications))
	} catch (error) {
		if (error instanceof z.ZodError) {
			return new Response('Invalid request data passed', { status: 422 })
		}

		return new Response('Could not fetch qualifications', { status: 500 })
	}
}
