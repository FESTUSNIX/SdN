import { UseFormReturn } from 'react-hook-form'
import { z } from 'zod'

export const PublicUnitValidator = z.object({
	id: z.number().optional(),
	name: z.string().min(2, {
		message: 'Nazwa musi mieć conajmniej 2 znaki'
	}),
	logo: z.any().optional(),
	email: z.string(),
	phone: z.string().optional(),
	isPublic: z.boolean().default(true),
	nip: z.string().optional(),
	regon: z.string().optional(),
	website: z.string().url({
		message: 'Nie poprawny adres URL'
	}),
	street: z.string().optional(),
	postalCode: z.string().optional(),
	cityId: z
		.number({
			required_error: 'Wybierz miasto'
		})
		.positive({
			message: 'Wybierz miasto'
		})
})

export type PublicUnitPayload = z.infer<typeof PublicUnitValidator>

export type PublicUnitFormType = UseFormReturn<PublicUnitPayload, any, undefined>
