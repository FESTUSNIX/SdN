import { z } from 'zod'
import { UseFormReturn } from 'react-hook-form'

export const QualificationValidator = z.object({
	id: z.number(),
	name: z.string().nonempty({
		message: 'Qualification name is required'
	}),
	type: z.enum(['OGOLNE', 'SPECJALISTYCZNE', 'ZAWODOWE', 'INNE']),
	keywords: z.string().array()
})

export type QualificationPayload = z.infer<typeof QualificationValidator>

export type QualificationFormType = UseFormReturn<QualificationPayload & { keywordInput: string }, any, undefined>
