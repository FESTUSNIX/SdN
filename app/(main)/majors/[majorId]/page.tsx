import EditorOutput from '@/app/components/EditorOutput'
import { Badge } from '@/app/components/ui/Badge'
import { H1, H2, H3, Muted } from '@/app/components/ui/Typography'
import { majorLevelEnum } from '@/app/constants/majorLevelEnum'
import { cn } from '@/lib/utils/utils'
import prisma from '@/prisma/client'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import ActiveDays from './components/ActiveDays'
import { Duration } from './components/Duration'
import SideBar from './components/SideBar'
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
		certificates,
		completionConditions,
		daysOfWeek,
		description,
		endDate,
		formOfStudy,
		isOnline,
		majorLevel,
		recruitmentConditions,
		startDate,
		syllabus,
		unitId
	} = major

	const sectionStyles = 'border-b py-8'

	return (
		<main className='wrapper min-h-screen'>
			<header className='relative border-b pb-6 pt-12'>
				<H1 size='sm' className=''>
					{name}
				</H1>

				<div className='items-centr mb-6 mt-4 flex gap-2'>
					<Badge variant={'secondary'}>{majorLevelEnum[majorLevel]}</Badge>
					{formOfStudy && <Badge variant={'secondary'}>{formOfStudy}</Badge>}
					<Badge variant={'secondary'}>{isOnline ? 'Online' : 'Stacjonarne'}</Badge>
				</div>

				{description && <EditorOutput content={description} />}
			</header>

			<div className='flex flex-col-reverse md:flex-row'>
				<div className='grow'>
					<section className={cn(sectionStyles, 'pt-12')}>
						<H2 size='sm'>Jakie kwalifikacje uzyskasz</H2>

						<div className='tw-prose'>
							<ul className='flex flex-col'>
								{qualifications?.map(q => (
									<li key={q.name}>{q.name}</li>
								))}
							</ul>
						</div>
					</section>

					{certificates && (
						<section className={cn(sectionStyles, 'pt-12')}>
							<H2 size='sm'>Zapewnione certyfikaty</H2>

							<p>{certificates}</p>
						</section>
					)}

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

					<section className={cn(sectionStyles, 'relative border-none')}>
						<H2 size='sm'>Czas trwania</H2>
						{startDate && endDate ? (
							<Muted className='mb-6'>
								{startDate?.toLocaleDateString()} - {endDate?.toLocaleDateString()}
							</Muted>
						) : (
							<Muted>Brak danych.</Muted>
						)}
						<Duration startDate={startDate} endDate={endDate} />

						{daysOfWeek.length !== 0 && <ActiveDays daysOfWeek={daysOfWeek} />}
					</section>
				</div>

				<SideBar major={major} />
			</div>

			<section className={cn(sectionStyles, 'border-b-none border-t')}>
				<H2 size='sm' className='mb-4'>
					Organizowane przez
				</H2>

				<Suspense fallback={<div>Loading...</div>}>
					<UnitCard unitId={unitId} />
				</Suspense>
			</section>
		</main>
	)
}

export default MajorPage
