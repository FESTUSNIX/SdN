import { z } from 'zod'

export const UnitEmailValidator = z.object({
	title: z.string().nonempty(),
	content: z.object({
		html: z.string(),
		text: z.string()
	}),
	sentBy: z.string(),
	sendTo: z.string().array(),
	sentAt: z.coerce.date(),
	unitId: z.number()
})

export type UnitEmailPayload = z.infer<typeof UnitEmailValidator>
