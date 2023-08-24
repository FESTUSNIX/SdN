import { z } from 'zod'

export const UnitEmailValidator = z.object({
	title: z.string().nonempty(),
	content: z.any(),
	sentBy: z.string(),
	sentTo: z.string().array(),
	sentAt: z.coerce.date(),
	unitId: z.number()
})

export type UnitEmailPayload = z.infer<typeof UnitEmailValidator>
