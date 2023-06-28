import { H1 } from '@/app/components/ui/Typography'
import prisma from '@/prisma/client'
import { notFound } from 'next/navigation'

type Props = { params: { majorId: number } }

const MajorPage = async ({ params }: Props) => {
	const major = await prisma.major.findFirst({
		where: { id: params.majorId },
		include: {
			qualifications: {
				select: {
					qualification: true
				}
			}
		}
	})

	if (!major) return notFound()

	return (
		<div className='flex min-h-screen flex-col items-center wrapper pt-12'>
			<H1 className={'mb-24'}>{major.name}</H1>

			<div className='flex flex-col gap-8'>
				<p>cost - {major.cost}</p>
				<p>duration - {major.durationInHours} hours</p>
				<p>numberOfSemesters - {major.numberOfSemesters}</p>
				<p>isOnline - {JSON.stringify(major.isOnline)}</p>
				{major.isOnline && <p>onlineDuration - {major.onlineDuration}</p>}
				<p>description - {major.description}</p>
				<p>address - {major.address}</p>
				<p>isRegulated - {JSON.stringify(major.isRegulated)}</p>
				<p>canPayInInstallments - {JSON.stringify(major.canPayInInstallments)}</p>
				<p>certificates - {major.certificates}</p>
				<p>completionConditions - {major.completionConditions}</p>
				<ul className='list-disc'>
					<p>daysOfWeek:</p>
					{major.daysOfWeek.map(day => (
						<li key={day}>{day}</li>
					))}
				</ul>
				<p>formOfStudy - {major.formOfStudy}</p>
				<p>startDate - {JSON.stringify(major.startDate)}</p>
				<p>endDate - {JSON.stringify(major.endDate)}</p>
				<p>organisator - {major.organisator}</p>
				<ul className='list-disc'>
					<p>qualifications:</p>
					{major.qualifications.map(({ qualification }) => (
						<li key={qualification.id}>
							{qualification.name} ({qualification.type})
						</li>
					))}
				</ul>
				<p>recruitmentConditions - {major.recruitmentConditions}</p>
				<p>syllabus - {major.syllabus}</p>
				<p>updatedAt - {JSON.stringify(major.updatedAt)}</p>
			</div>
		</div>
	)
}

export default MajorPage