import { getAuthSession } from '@/lib/auth/auth'
import { PasswordValidator } from '@/lib/validators/password'
import prisma from '@/prisma/client'
import { z } from 'zod'
import bcrypt from 'bcryptjs'

export async function PATCH(req: Request) {
	try {
		const session = await getAuthSession()

		if (!session?.user) {
			return new Response('Unauthorized', { status: 401 })
		}

		const body = await req.json()

		const { password } = PasswordValidator.parse(body)

		const hashedPassword = await bcrypt.hash(password, 10)

		await prisma.user.update({
			where: {
				id: session.user.id
			},
			data: {
				password: hashedPassword
			}
		})

		return new Response('OK')
	} catch (error) {
		if (error instanceof z.ZodError) {
			return new Response('Invalid request data passed', { status: 422 })
		}

		return new Response('Could not update password, please try again later.', { status: 500 })
	}
}
