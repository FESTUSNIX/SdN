import { UnitEmailValidator } from '@/lib/validators/unitEmail'
import prisma from '@/prisma/client'
import { z } from 'zod'

export async function POST(req: Request) {
	try {
		const body = await req.json()

		const { sentAt, sentBy, title, content, unitId, sentTo } = UnitEmailValidator.parse(body)

		const email = await prisma.unitEmail.create({
			data: {
				title,
				content: JSON.stringify(content),
				sentAt: sentAt,
				sentBy,
				sentTo,
				unitId: unitId,
			}
		})

		return new Response(email.id.toString())
	} catch (error) {
		if (error instanceof z.ZodError) {
			return new Response('Invalid POST request data passed', { status: 422 })
		}

		return new Response('Could not create a new email', { status: 500 })
	}
}
