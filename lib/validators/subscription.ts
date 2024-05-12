import { z } from 'zod'
import { UseFormReturn } from 'react-hook-form'

export const SubscriptionValidator = z.object({
	slug: z.string().min(1, {
		message: 'Slug is required'
	}),
	unitId: z.string().min(1, {
		message: 'Unit ID is required'
	}),
	from: z.coerce.date(),
	to: z.coerce.date().nullable(),
	type: z.string().min(1, {
		message: 'Subscription type is required'
	})
})

export const SubscriptionTableValidator = z.object({
	slug: z.string().min(1, {
		message: 'Slug is required'
	}),
	from: z.date(),
	to: z.date().nullable(),
	type: z.string().min(1, {
		message: 'Subscription type is required'
	}),
	unit: z.object({
		id: z.number(),
		name: z.string(),
		slug: z.string()
	})
})

export type SubscriptionPayload = z.infer<typeof SubscriptionValidator>
export type SubscriptionTablePayload = z.infer<typeof SubscriptionTableValidator>

export type SubscriptionFormType = UseFormReturn<SubscriptionPayload, any, undefined>
