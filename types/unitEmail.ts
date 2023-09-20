import { UnitEmail, User } from '@prisma/client'

export type EmailData = Pick<UnitEmail, 'id' | 'title' | 'sentAt' | 'sentTo'> & {
	user: Pick<User, 'name' | 'email' | 'image'>
} & { content: { html: string; text: string } }
