'use client'

import React from 'react'
import ViewEmail from './ViewEmail'
import UserAvatar from '@/app/components/UserAvatar'
import { H3, Muted } from '@/app/components/ui/Typography'
import { formatDistance } from 'date-fns'
import { useGlobalModalContext } from '../../../context/GlobalModalContext'
import { Prisma } from '@prisma/client'

type Props = {
	id: number
	title: string
	content: Prisma.JsonValue
	sentAt: Date
	sentTo: string[]
	user: {
		name: string | null
		image: string | null
		email: string
	}
}

const EmailCard = ({ content, id, sentAt, sentTo, title, user }: Props) => {
	const { openModal } = useGlobalModalContext()

	return (
		<button
			key={id}
			onClick={() => {
				openModal(
					'CUSTOM',
					undefined,
					<ViewEmail emailId={id} content={content} sentAt={sentAt} title={title} user={user} sentTo={sentTo} />
				)
			}}
			className='flex gap-x-4 gap-y-2 overflow-hidden rounded-lg border p-4'>
			<UserAvatar
				user={{ name: user.name, image: user.image }}
				className='col-start-1 col-end-2 row-start-1 row-end-2'
			/>
			<div className='flex grow flex-col items-start'>
				<div className='flex w-full items-center justify-between gap-2'>
					<H3 size='sm' className='truncate leading-tight'>
						{title}
					</H3>
					<Muted className='text-xs'>{formatDistance(sentAt, new Date())}</Muted>
				</div>
				<Muted className='truncate'>by {user.name}</Muted>
			</div>
		</button>
	)
}

export default EmailCard
