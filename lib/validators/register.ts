import { z } from 'zod'

export const RegisterValidator = z.object({
	name: z
		.string()
		.min(3, {
			message: 'Name must be at least 3 characters long'
		})
		.max(120, {
			message: 'Provided name is too long'
		}),
	email: z.string().email({
		message: 'Invalid email address'
	}),
	password: z.string().nonempty({
		message: 'Password is required'
	})
})

export type RegisterPayload = z.infer<typeof RegisterValidator>
