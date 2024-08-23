import EditorOutput from '@/app/components/EditorOutput'
import { Badge } from '@/app/components/ui/badge'
import { H1, H2, H3, Muted } from '@/app/components/ui/Typography'
import { majorLevelEnum } from '@/app/constants/majorLevel'
import { urlFor } from '@/lib/supabase/getUrlFor'
import { cn } from '@/lib/utils'
import prisma from '@/prisma/client'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import ActiveDays from './components/ActiveDays'
import { Duration } from './components/Duration'
import SideBar from './components/SideBar'
import { SimiliarMajors } from './components/SimiliarMajors'
import UnitCard from './components/UnitCard'
import { Metadata } from 'next'

export async function generateMetadata({ params: { majorSlug } }: { params: { majorSlug: string } }) {
	const major = await prisma.major.findFirst({
		where: {
			slug: majorSlug,
			status: 'PUBLISHED'
		},
		select: {
			name: true,
			keywords: true,
			qualifications: {
				select: {
					name: true,
					slug: true
				}
			},
			unit: {
				select: {
					name: true
				}
			}
		}
	})

	if (!major) return notFound()

	const image = urlFor('qualification_images', `${major.qualifications[0]?.slug}.jpg`).publicUrl

	const description = `${major.name} to kierunek studiów oferowany przez ${
		major.unit.name
	}. Kierunek pozwala na uzyskanie kwalifikacji takich jak: ${major.qualifications.map(q => q.name).join(', ')}.`

	const metadata: Metadata = {
		title: major.name,
		description: description,
		openGraph: {
			images: [image]
		},
		keywords: major.keywords
	}

	return metadata
}

const MajorPage = async ({ params: { majorSlug } }: { params: { majorSlug: string } }) => {
	const major = await prisma.major.findFirst({
		where: {
			slug: majorSlug,
			status: 'PUBLISHED'
		},
		include: {
			qualifications: {
				select: {
					id: true,
					name: true,
					slug: true
				}
			},
			unit: {
				select: {
					id: true,
					name: true,
					subscriptions: {
						where: {
							to: {
								gte: new Date()
							},
							type: {
								in: ['PREMIUM', 'STANDARD']
							}
						}
					}
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
		isOnline,
		majorLevel,
		recruitmentConditions,
		startDate,
		syllabus,
		unitId,
		keywords,
		unit: { subscriptions }
	} = major

	const hasActiveSubscription = subscriptions?.length > 0

	const sectionStyles = 'border-b py-8'

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
						<Badge variant={'secondary'}>{isOnline ? 'Online' : 'Stacjonarne'}</Badge>
					</div>

					{hasActiveSubscription && description && Array.isArray(description) && description.length !== 0 && (
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

					{certificates && hasActiveSubscription && (
						<section className={cn(sectionStyles, 'pt-12')}>
							<H2 size='sm'>Zapewnione certyfikaty</H2>

							<p>{certificates}</p>
						</section>
					)}

					{hasActiveSubscription &&
						recruitmentConditions &&
						Array.isArray(recruitmentConditions) &&
						recruitmentConditions.length !== 0 && (
							<section className={sectionStyles}>
								<H2 size='sm'>Warunki rekrutacji</H2>
								<EditorOutput content={recruitmentConditions} />
							</section>
						)}

					{hasActiveSubscription &&
						completionConditions &&
						Array.isArray(completionConditions) &&
						completionConditions.length !== 0 && (
							<section className={sectionStyles}>
								<H2 size='sm'>Warunki ukończenia</H2>
								<EditorOutput content={completionConditions} />
							</section>
						)}

					{hasActiveSubscription && syllabus && Array.isArray(syllabus) && syllabus.length !== 0 && (
						<section className={sectionStyles}>
							<H2 size='sm'>Program studiów</H2>
							<EditorOutput content={syllabus} />
						</section>
					)}

					{hasActiveSubscription && (
						<section className={cn(sectionStyles, 'relative border-none')}>
							<H2 size='sm'>Czas trwania</H2>
							{startDate && endDate ? (
								<H3 className='mb-2 mt-4'>
									{startDate?.toLocaleDateString()} - {endDate?.toLocaleDateString()}
								</H3>
							) : (
								<Muted>Brak danych.</Muted>
							)}
							<Duration startDate={startDate} endDate={endDate} />

							{daysOfWeek.length !== 0 && (
								<>
									<H3 className='mb-2 mt-8'>Zajęcia odbywają się w:</H3>
									<ActiveDays daysOfWeek={daysOfWeek} />
								</>
							)}
						</section>
					)}
				</div>

				<SideBar major={major} hasActiveSubscription={hasActiveSubscription} />
			</div>

			<section className={cn(sectionStyles, 'wrapper border-t border-b-transparent')}>
				<H2 size='sm' className='mb-4'>
					Organizowane przez
				</H2>

				<Suspense fallback={<div>Ładowanie organizatora...</div>}>
					<UnitCard unitId={unitId} />
				</Suspense>
			</section>

			<Suspense fallback={<div>Ładowanie podobnych kierunków...</div>}>
				<SimiliarMajors currentMajor={major} />
			</Suspense>

			<div className='sr-only'>
				<ul>
					{keywords.map((keyword, i) => (
						<li key={i}>
							<h3>{keyword}, </h3>
						</li>
					))}
				</ul>
			</div>
		</main>
	)
}

export default MajorPage
