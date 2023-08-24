import React from 'react'
import Emails from '../Emails'
import prisma from '@/prisma/client'

type Props = {
	unitId: number
}

const EmailsShell = async ({ unitId }: Props) => {
	const emails = await prisma.unitEmail.findMany({
		where: {
			unitId: unitId
		},
		select: {
			id: true,
			title: true,
			content: true,
			sentAt: true,
			sentTo: true,
			user: {
				select: {
					name: true,
					image: true,
					email: true
				}
			}
		}
	})

	return (
		<div>
			<Emails unitId={unitId} emails={emails} />
		</div>
	)
}

export default EmailsShell
