import React from 'react'
import Emails from '../Emails'
import prisma from '@/prisma/client'

type Props = {
	unitId: number
}

const EmailsShell = async ({ unitId }: Props) => {
	const emailsData = prisma.unitEmail.findMany({
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
		},
		orderBy: {
			sentAt: 'desc'
		}
	})

	const majorsData = prisma.major.findMany({
		where: {
			unitId: unitId
		}
	})

	const [emails, majors] = await Promise.all([emailsData, majorsData])

	return (
		<div>
			<Emails unitId={unitId} emails={emails} majors={majors} />
		</div>
	)
}

export default EmailsShell
