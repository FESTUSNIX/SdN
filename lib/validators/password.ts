import { z } from 'zod'

export const PasswordChangeValidator = z.object({
	currentPassword: z.string().nonempty(),
	newPassword: z.string().min(6, {
		message: 'Password must be at least 6 characters'
	})
})

export type PasswordChangeRequest = z.infer<typeof PasswordChangeValidator>
