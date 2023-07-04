import { UseFormReturn } from 'react-hook-form'
import { z } from 'zod'

export const UnitValidator = z.object({
	id: z.number().optional(),
	name: z.string().min(2, {
		message: 'Username must be at least 2 characters.'
	}),
	logo: z.any().optional(),
	email: z.string(),
	phone: z.string().optional(),
	isPublic: z.boolean().default(true),
	nip: z.string().optional(),
	regon: z.string().optional(),
	unitType: z.string(),
	website: z.string().url(),
	street: z.string().optional(),
	postalCode: z.string().optional(),
	cityId: z
		.number({
			required_error: 'Please select a city'
		})
		.positive({
			message: 'Please select a city'
		}),
	notes: z.string().optional(),
	status: z.enum(['FINISHED', 'IN_PROGRESS'])
})

export const UnitTableValidator = z.object({
	id: z.number(),
	name: z.string(),
	email: z.string(),
	unitType: z.string(),
	website: z.string(),
	status: z.enum(['FINISHED', 'IN_PROGRESS']),
	city: z.object({
		name: z.string()
	})
})

export type UnitPayload = z.infer<typeof UnitValidator>

export type UnitFormType = UseFormReturn<UnitPayload, any, undefined>
