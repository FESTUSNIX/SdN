import { z } from 'zod'

export const RegisterValidator = z.object({
	email: z.string().email({
		message: 'Invalid email address'
	}),
	password: z.string().nonempty({
		message: 'Password is required'
	})
})

export type RegisterPayload = z.infer<typeof RegisterValidator>
