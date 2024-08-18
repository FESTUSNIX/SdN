import MajorCard from '@/app/components/Majors/Card'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/app/components/ui/carousel'
import { H2 } from '@/app/components/ui/Typography'
import { getSimiliarMajors, SimiliarMajor } from '@/lib/queries/major'
import { Major, Qualification } from '@prisma/client'
import { unstable_cache } from 'next/cache'

type CurrentMajor = Major & { qualifications: Pick<Qualification, 'id'>[] }

type Props = {
	currentMajor: CurrentMajor
}

export const SimiliarMajors = async ({ currentMajor }: Props) => {
	const getCachedSimiliarMajors = unstable_cache(
		async (currentMajor: CurrentMajor) => {
			const qualificationIds = currentMajor.qualifications.map(qualification => qualification.id)
			return getSimiliarMajors({ currentMajor: { ...currentMajor, qualificationIds }, take: 10 })
		},
		[currentMajor.id.toString()],
		{
			tags: ['similiarMajors'],
			revalidate: 60 * 60
		}
	)
	const similarMajors = await getCachedSimiliarMajors(currentMajor)

	if (!similarMajors.length) return null

	const sortMajors = (majors: SimiliarMajor[], currentMajor: CurrentMajor) => {
		return majors.sort((a, b) => {
			const weightA = calculateWeight(a, currentMajor)
			const weightB = calculateWeight(b, currentMajor)

			if (weightA > weightB) return -1
			if (weightA < weightB) return 1
			return 0
		})
	}

	const calculateWeight = (major: SimiliarMajor, currentMajor: CurrentMajor) => {
		let weight = 0

		// Qualifications
		major.qualifications.forEach(qualification => {
			if (currentMajor.qualifications.some(currentQualification => currentQualification.id === qualification.id)) {
				weight += 1.5
			}
		})

		// Subscriptions
		if (
			major.unit.subscriptions.some(subscription => subscription.type === 'PREMIUM' || subscription.type === 'STANDARD')
		) {
			weight += 3
		}

		// Major level
		if (major.majorLevel === currentMajor.majorLevel) weight += 2

		// Keywords
		major.keywords.forEach(keyword => {
			if (currentMajor.keywords.includes(keyword)) weight += 0.5
		})

		// Online
		if (major.isOnline === currentMajor.isOnline) weight += 1

		return weight
	}

	const sortedMajors = sortMajors(similarMajors, currentMajor)

	return (
		<section className='w-full overflow-hidden'>
			<div className='wrapper border-t py-8'>
				<Carousel className='w-full'>
					<div className='mb-4 flex flex-wrap items-center justify-between gap-x-4'>
						<H2 size='sm'>Podobne kierunki</H2>
						<div className='flex items-center gap-2'>
							<CarouselPrevious className='relative left-0 translate-y-0' />
							<CarouselNext className='relative right-0 translate-y-0' />
						</div>
					</div>
					<CarouselContent className='-ml-3'>
						{sortedMajors.map((major, index) => (
							<CarouselItem key={index} className='pl-3 md:basis-1/2 lg:basis-1/3'>
								<MajorCard key={major.id} data={major} type='grid' className='h-full' />
							</CarouselItem>
						))}
					</CarouselContent>
				</Carousel>
			</div>
		</section>
	)
}
