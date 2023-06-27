import bcrypt from 'bcryptjs'

import { RegisterValidator } from '@/lib/validators/register'
import prisma from '@/prisma/client'
import { z } from 'zod'

export async function POST(request: Request) {
	try {
		const body = await request.json()

		const { email, password } = RegisterValidator.parse(body)
		const user = await prisma.user.findUnique({
			where: { email }
		})

		if (user !== null) {
			return new Response('This email is taken', { status: 409 })
		}

		const hashedPassword = await bcrypt.hash(password, 10)

		const newUser = await prisma.user.create({
			data: {
				email,
				password: hashedPassword
			}
		})

		return new Response(JSON.stringify(newUser))
	} catch (error) {
		if (error instanceof z.ZodError) {
			return new Response('Invalid POST request data passed', { status: 422 })
		}

		return new Response('Could not create new user', { status: 500 })
	}
}
