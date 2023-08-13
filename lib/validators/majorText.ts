import { z } from 'zod'

export type MajorTextTypes = 'completionConditions' | 'description' | 'recruitmentConditions' | 'syllabus'

export const MajorTextValidator = z.object({
	majorId: z.number(),
	content: z.any(),
	type: z.enum(['completionConditions', 'description', 'recruitmentConditions', 'syllabus'])
})

export type MajorTextCreationRequest = z.infer<typeof MajorTextValidator>
