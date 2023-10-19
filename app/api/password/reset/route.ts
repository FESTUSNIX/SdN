import { getAuthSession } from '@/lib/auth/auth'
import prisma from '@/prisma/client'
import { z } from 'zod'
import bcrypt from 'bcryptjs'
import { PasswordChangeValidator } from '@/lib/validators/password'

export async function PATCH(req: Request) {
	try {
		const session = await getAuthSession()

		if (!session?.user) {
			return new Response('Unauthorized', { status: 401 })
		}

		const body = await req.json()
		const { currentPassword, newPassword } = PasswordChangeValidator.parse(body)

		const user = await prisma.user.findFirst({
			where: {
				id: session.user.id
			},
			select: {
				password: true
			}
		})

		if (!user) return new Response('Unauthorized', { status: 401 })

		const match = await bcrypt.compare(currentPassword, user?.password)

		if (!match) return new Response('Provided password is invalid', { status: 401 })

		const hashedPassword = await bcrypt.hash(newPassword, 10)

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
