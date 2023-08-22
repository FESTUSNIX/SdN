import { z } from 'zod'

export const UnitEmailValidator = z.object({
	title: z.string(),
	content: z.any(),
	sentBy: z.string(),
	sentAt: z.coerce.date().nullable()
})

export type UnitEmailPayload = z.infer<typeof UnitEmailValidator>
