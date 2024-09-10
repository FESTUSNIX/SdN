import { z } from 'zod'
import { UseFormReturn } from 'react-hook-form'

export const CityValidator = z.object({
	id: z.number().optional(),
	name: z.string(),
	voivodeship: z.object({
		id: z.number(),
		name: z.string().optional()
	}),
	description: z.string().nullable(),
	image: z.any().nullable()
})

export type CityPayload = z.infer<typeof CityValidator>
export type CityFormType = UseFormReturn<CityPayload, any, undefined>
