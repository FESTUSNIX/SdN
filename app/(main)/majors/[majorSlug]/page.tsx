import EditorOutput from '@/app/components/EditorOutput'
import { Badge } from '@/app/components/ui/Badge'
import { H1, H2, Muted } from '@/app/components/ui/Typography'
import { majorLevelEnum } from '@/app/constants/majorLevel'
import { urlFor } from '@/lib/supabase/getUrlFor'
import { cn } from '@/lib/utils/utils'
import prisma from '@/prisma/client'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import ActiveDays from './components/ActiveDays'
import { Duration } from './components/Duration'
import SideBar from './components/SideBar'
import UnitCard from './components/UnitCard'

const MajorPage = async ({ params: { majorSlug } }: { params: { majorSlug: string } }) => {
	const major = await prisma.major.findFirst({
		where: {
			slug: majorSlug
		},
		include: {
			qualifications: {
				select: {
					name: true,
					type: true,
					keywords: true,
					slug: true
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

	console.log('IMG ===============', urlFor('qualification_images', `${qualifications[0].slug}.jpg`).publicUrl)
	return (
		<main className='min-h-screen'>
			<header className='relative overflow-hidden border-b pb-6'>
				<div className='pointer-events-none relative -z-10 mb-8 h-[35vh] max-h-[500px] min-h-[260px] w-screen overflow-hidden border-b [clip-path:inset(0)] xl:h-[40vh]'>
					<div className='fixed h-[35vh] max-h-[500px] min-h-[260px] w-screen xl:h-[40vh]'>
						<Image
							src={urlFor('qualification_images', `${qualifications[0]?.slug}.jpg`).publicUrl}
							alt={`Zdjęcie kwalifikacji ${qualifications[0].name}`}
							fill
							sizes='100vw'
							priority
							className='inset-0 h-full w-full select-none object-cover object-center'
						/>
					</div>
					<div className='absolute inset-0 bg-black/50'></div>
				</div>

				<div className='wrapper'>
					<H1 size='sm' className=''>
						{name}
					</H1>

					<div className='items-centr mb-6 mt-4 flex gap-2'>
						<Badge variant={'secondary'}>{majorLevelEnum[majorLevel]}</Badge>
						{formOfStudy && <Badge variant={'secondary'}>{formOfStudy}</Badge>}
						<Badge variant={'secondary'}>{isOnline ? 'Online' : 'Stacjonarne'}</Badge>
					</div>

					{description && Array.isArray(description) && description.length !== 0 && (
						<EditorOutput content={description} />
					)}
				</div>
			</header>

			<div className='wrapper flex flex-col-reverse md:flex-row'>
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

					{recruitmentConditions && Array.isArray(recruitmentConditions) && recruitmentConditions.length !== 0 && (
						<section className={sectionStyles}>
							<H2 size='sm'>Warunki rekrutacji</H2>
							<EditorOutput content={recruitmentConditions} />
						</section>
					)}

					{completionConditions && Array.isArray(completionConditions) && completionConditions.length !== 0 && (
						<section className={sectionStyles}>
							<H2 size='sm'>Warunki ukończenia</H2>
							<EditorOutput content={completionConditions} />
						</section>
					)}

					{syllabus && Array.isArray(syllabus) && syllabus.length !== 0 && (
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

			<section className={cn(sectionStyles, 'border-b-none wrapper border-t')}>
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
