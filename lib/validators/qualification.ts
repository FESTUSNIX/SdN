import { z } from 'zod'
import { UseFormReturn } from 'react-hook-form'

export const QualificationValidator = z.object({
	id: z.number(),
	name: z.string(),
	type: z.enum(['OGOLNE', 'SPECJALISTYCZNE', 'ZAWODOWE', 'INNE']),
	keywords: z.string().array().nullable()
})

export type QualificationPayload = z.infer<typeof QualificationValidator>

export type QualificationFormType = UseFormReturn<QualificationPayload, any, undefined>
