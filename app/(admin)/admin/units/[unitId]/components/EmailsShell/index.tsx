import prisma from '@/prisma/client'
import { EmailData } from '@/types/unitEmail'
import Emails from '../Emails'

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
		},
		include: {
			qualifications: {
				select: {
					name: true
				}
			}
		}
	})

	const [emails, majors] = await Promise.all([emailsData, majorsData])

	const unit = await prisma.unit.findFirst({
		where: {
			id: unitId
		}
	})

	if (!emails || !majors || !unit) return null

	return (
		<div>
			<Emails unitId={unitId} emails={emails as EmailData[]} majors={majors} unit={unit} />
		</div>
	)
}

export default EmailsShell
