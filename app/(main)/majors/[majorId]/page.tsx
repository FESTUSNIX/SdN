import EditorOutput from '@/app/components/EditorOutput'
import { Badge } from '@/app/components/ui/Badge'
import { H1, H2, H3, Muted } from '@/app/components/ui/Typography'
import { majorLevelEnum } from '@/app/constants/majorLevelEnum'
import prisma from '@/prisma/client'
import { notFound } from 'next/navigation'
import SideBar from './components/SideBar'
import { cn } from '@/lib/utils/utils'
import { Duration } from './components/Duration'
import UnitCard from './components/UnitCard'

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
		syllabus,
		unitId
	} = major

	const sectionStyles = 'border-b py-6'

	return (
		<main className='wrapper min-h-screen'>
			<header className='border-b pb-6 pt-12'>
				<H1 size='sm' className=''>
					{name}
				</H1>

				<div className='items-centr mb-6 mt-4 flex gap-2'>
					<Badge variant={'secondary'}>{majorLevelEnum[majorLevel]}</Badge>
					{formOfStudy && <Badge variant={'secondary'}>{formOfStudy}</Badge>}
					<Badge variant={'secondary'}>{isOnline ? 'Online' : 'Stacjonarne'}</Badge>
				</div>

				<div className=''>
					<EditorOutput content={description} />
				</div>
			</header>

			<div className='flex'>
				<div className='grow'>
					<section className={cn(sectionStyles, 'pt-12')}>
						<H2 size='sm'>Jakie kwalifikacje uzyskasz:</H2>

						<div className='tw-prose'>
							<ul className='flex flex-col'>
								{qualifications?.map(q => (
									<li key={q.name}>{q.name}</li>
								))}
							</ul>
						</div>
					</section>

					{recruitmentConditions && (
						<section className={sectionStyles}>
							<H2 size='sm'>Warunki rekrutacji</H2>
							<EditorOutput content={recruitmentConditions} />
						</section>
					)}

					{completionConditions && (
						<section className={sectionStyles}>
							<H2 size='sm'>Warunki ukończenia</H2>
							<EditorOutput content={completionConditions} />
						</section>
					)}

					{syllabus && (
						<section className={sectionStyles}>
							<H2 size='sm'>Program studiów</H2>
							<EditorOutput content={syllabus} />
						</section>
					)}

					<section className={cn(sectionStyles, 'border-none')}>
						<H2 size='sm'>Czas trwania</H2>
						<Muted className='mb-6'>
							{startDate?.toLocaleDateString()} - {endDate?.toLocaleDateString()}
						</Muted>
						<Duration startDate={startDate} endDate={endDate} />
					</section>
				</div>

				<SideBar major={major} />
			</div>

			<section className={cn(sectionStyles, 'border-b-none border-t')}>
				<H2 size='sm'>Organizowane przez</H2>

				<UnitCard unitId={unitId} />
			</section>
		</main>
	)
}

export default MajorPage
