import { mailTransporter } from '@/lib/nodemailer/transporter'
import { UnitEmailValidator } from '@/lib/validators/unitEmail'
import prisma from '@/prisma/client'
import { z } from 'zod'

export async function POST(req: Request) {
	try {
		const body = await req.json()

		const { sentAt, sentBy, title, content, unitId, sendTo } = UnitEmailValidator.parse(body)

		const info = await mailTransporter.sendMail({
			from: '"Studia dla Nauczycieli" <info@studiadlanauczycieli.pl>',
			to: sendTo,
			subject: title,
			text: content.text,
			html: content.html
		})

		const email = await prisma.unitEmail.create({
			data: {
				title,
				content,
				sentAt: sentAt,
				sentBy,
				sentTo: sendTo,
				unitId: unitId
			}
		})

		return new Response('OK')
	} catch (error) {
		if (error instanceof z.ZodError) {
			return new Response('Invalid POST request data passed', { status: 422 })
		}

		return new Response('Could not send a new email', { status: 500 })
	}
}
