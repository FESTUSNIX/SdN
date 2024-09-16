import { z } from 'zod'
import { zodEnum } from '../utils'

export const EMAIL_TOPICS = [
	{ value: 'edu-offer', label: 'Oferta edukacyjna' },
	{ value: 'unit-collab', label: 'Współpraca z uczelnią' },
	{ value: 'suggestions-reviews', label: 'Sugestie i opinie' },
	{ value: 'recrutation', label: 'Zapytanie o rekrutację' },
	{ value: 'technical-support', label: 'Wsparcie techniczne' },
	{ value: 'other', label: 'Inne' }
] as const

export const ContactEmailValidator = z.object({
	name: z.string().min(2, { message: 'Imię lub nazwa uczelni musi zawierać conajmniej 2 znaki' }),
	email: z.string().email({
		message: 'Prosimy o podanie poprawnego adresu email'
	}),
	message: z.string().min(1, {
		message: 'Prosimy o podanie wiadomości'
	}),
	phone: z.string().optional(),
	topic: z.enum(zodEnum(EMAIL_TOPICS.map(({ value }) => value)), {
		errorMap: () => ({
			message: 'Prosimy o wybranie tematu wiadomości'
		})
	})
})

export type ContactEmailPayload = z.infer<typeof ContactEmailValidator>
