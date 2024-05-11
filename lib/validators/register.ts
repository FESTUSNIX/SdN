import { UserRole } from '@prisma/client'
import { UseFormReturn } from 'react-hook-form'
import { z } from 'zod'

export const RegisterValidator = z
	.object({
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
		}),
		role: z.nativeEnum(UserRole),
		unitId: z.string().optional()
	})
	.refine(
		input => {
			// If role is UNIT, unitId must be provided
			if (input.role === UserRole.UNIT && !input.unitId) {
				return false
			}

			return true
		},
		{
			message: 'Unit ID is required for unit users',
			path: ['unitId']
		}
	)

export type RegisterPayload = z.infer<typeof RegisterValidator>

export type RegisterFormType = UseFormReturn<RegisterPayload, any, undefined>
