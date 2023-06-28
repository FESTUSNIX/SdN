import { z } from 'zod'

export const PasswordValidator = z.object({
	password: z.string().nonempty({
		message: 'Password is required'
	})
})

export type PasswordRequest = z.infer<typeof PasswordValidator>
