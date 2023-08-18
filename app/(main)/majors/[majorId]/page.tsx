import EditorOutput from '@/app/components/EditorOutput'
import { H1, H3 } from '@/app/components/ui/Typography'
import prisma from '@/prisma/client'
import Link from 'next/link'
import { notFound } from 'next/navigation'

const MajorPage = async ({ params: { majorId } }: { params: { majorId: string } }) => {
	const major = await prisma.major.findFirst({
		where: {
			id: parseInt(majorId)
		},
		include: {
			qualifications: {
				select: {
					name: true,
					type: true,
					keywords: true
				}
			}
		}
	})

	if (!major) return notFound()

	const {
		name,
		qualifications,
		address,
		canPayInInstallments,
		certificates,
		completionConditions,
		contact,
		cost,
		daysOfWeek,
		description,
		durationInHours,
		endDate,
		formOfStudy,
		id,
		isOnline,
		isRegulated,
		majorLevel,
		numberOfSemesters,
		onlineDuration,
		organisator,
		recruitmentConditions,
		startDate,
		status,
		syllabus
	} = major

	console.log(major)
	return (
		<div className='wrapper min-h-screen pt-12 dark:prose-invert'>
			<H1 size='sm' className='mb-12'>
				{name}
			</H1>

			<div className='mb-2 flex items-center'>
				<H3 size='sm' className='mb-0'>
					id:&nbsp;
				</H3>
				<p>{id}</p>
			</div>

			<div className='mb-2 flex items-center'>
				<H3 size='sm' className='mb-0'>
					qualifications:&nbsp;
				</H3>
				{qualifications && (
					<p>
						{qualifications?.map(q => (
							<span key={q.name}>
								{q.name} ({q.type}),
							</span>
						))}
					</p>
				)}
			</div>

			<div className='mb-2 flex items-center'>
				<H3 size='sm' className='mb-0'>
					address:&nbsp;
				</H3>
				<p>{address}</p>
			</div>

			<div className='mb-2 flex items-center'>
				<H3 size='sm' className='mb-0'>
					canPayInInstallments:&nbsp;
				</H3>
				<p>{JSON.stringify(canPayInInstallments)}</p>
			</div>

			<div className='mb-2 flex items-center'>
				<H3 size='sm' className='mb-0'>
					certificates:&nbsp;
				</H3>
				<p>{certificates}</p>
			</div>

			<div className='mb-2 flex items-center'>
				<H3 size='sm' className='mb-0'>
					contact:&nbsp;
				</H3>
				<p>{contact}</p>
			</div>

			<div className='mb-2 flex items-center'>
				<H3 size='sm' className='mb-0'>
					cost:&nbsp;
				</H3>
				<p>{cost}</p>
			</div>

			<div className='mb-2 flex items-center'>
				<H3 size='sm' className='mb-0'>
					daysOfWeek:&nbsp;
				</H3>
				{daysOfWeek && (
					<p>
						{daysOfWeek?.map(item => (
							<span key={item}>{item}, </span>
						))}
					</p>
				)}
			</div>

			<div className='mb-2 flex items-center'>
				<H3 size='sm' className='mb-0'>
					durationInHours:&nbsp;
				</H3>
				<p>{durationInHours}</p>
			</div>
			<div className='mb-2 flex items-center'>
				<H3 size='sm' className='mb-0'>
					formOfStudy:&nbsp;
				</H3>
				<p>{formOfStudy}</p>
			</div>
			<div className='mb-2 flex items-center'>
				<H3 size='sm' className='mb-0'>
					isOnline:&nbsp;
				</H3>
				<p>{JSON.stringify(isOnline)}</p>
			</div>

			<div className='mb-2 flex items-center'>
				<H3 size='sm' className='mb-0'>
					isRegulated:&nbsp;
				</H3>
				<p>{JSON.stringify(isRegulated)}</p>
			</div>
			<div className='mb-2 flex items-center'>
				<H3 size='sm' className='mb-0'>
					majorLevel:&nbsp;
				</H3>
				<p>{majorLevel}</p>
			</div>
			<div className='mb-2 flex items-center'>
				<H3 size='sm' className='mb-0'>
					numberOfSemesters:&nbsp;
				</H3>
				<p>{numberOfSemesters}</p>
			</div>
			<div className='mb-2 flex items-center'>
				<H3 size='sm' className='mb-0'>
					onlineDuration:&nbsp;
				</H3>
				<p>{onlineDuration}</p>
			</div>

			<div className='mb-2 flex items-center'>
				<H3 size='sm' className='mb-0'>
					endDate:&nbsp;
				</H3>
				<p>{endDate?.toLocaleDateString()}</p>
			</div>
			<div className='mb-2 flex items-center'>
				<H3 size='sm' className='mb-0'>
					startDate:&nbsp;
				</H3>
				<p>{startDate?.toLocaleDateString()}</p>
			</div>
			<div className='mb-2 flex items-center'>
				<H3 size='sm' className='mb-0'>
					status:&nbsp;
				</H3>
				<p>{status}</p>
			</div>
			<div className='mb-2 flex items-center'>
				<H3 size='sm' className='mb-0'>
					organisator:&nbsp;
				</H3>
				<p>{organisator}</p>
			</div>

			<div className='mb-2'>
				<H3 size='sm' className='mb-0'>
					completionConditions
				</H3>
				<EditorOutput content={completionConditions} />
			</div>
			<div className='mb-2'>
				<H3 size='sm' className='mb-0'>
					recruitmentConditions
				</H3>
				<EditorOutput content={recruitmentConditions} />
			</div>
			<div className='mb-2'>
				<H3 size='sm' className='mb-0'>
					description
				</H3>
				<EditorOutput content={description} />
			</div>
			<div className='mb-2'>
				<H3 size='sm' className='mb-0'>
					syllabus
				</H3>
				<EditorOutput content={syllabus} />
			</div>
		</div>
	)
}

export default MajorPage
