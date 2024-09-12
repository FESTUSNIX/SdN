import MajorCard from '@/app/components/Majors/Card'
import MajorCardSkeleton from '@/app/components/Majors/CardSkeleton'
import prisma from '@/prisma/client'
import { unstable_cache } from 'next/cache'

type Props = {}

const getCachedPromotedMajors = unstable_cache(
	async () => {
		return await prisma.promotedMajors.findMany({
			select: {
				major: {
					select: {
						id: true,
						name: true,
						majorLevel: true,
						isOnline: true,
						slug: true,
						qualifications: {
							select: {
								slug: true,
								name: true
							}
						},
						unit: {
							select: {
								name: true
							}
						}
					}
				}
			},
			take: 8,
			orderBy: {
				promotedAt: 'desc'
			}
		})
	},
	[],
	{
		tags: ['promotedMajors'],
		// 2 hours
		revalidate: 60 * 60 * 2
	}
)

export const RecommendedMajors = async (props: Props) => {
	const promotedMajors = await getCachedPromotedMajors()

	if (!promotedMajors.length) return null

	const majors = promotedMajors.map(promotedMajor => promotedMajor.major)

	return (
		<section className='wrapper mb-32'>
			<div className='mb-12'>
				<h2 className='mb-2 font-heading text-3xl font-semibold sm:text-4xl md:text-5xl'>Nasze rekomendacje</h2>
				<p className='max-w-prose text-pretty text-base text-muted-foreground'>
					Staramy się wybierać dla Ciebie najlepsze kierunki studiów. Zobacz, które kierunki są teraz najbardziej
					popularne i cieszą się największym zainteresowaniem. Może znajdziesz coś dla siebie?
				</p>
			</div>

			<div className='grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4'>
				{majors.map(major => (
					<MajorCard key={major.id} type='grid' likeable data={major} />
				))}
			</div>
		</section>
	)
}

export const RecommendedMajorsSkeleton = () => {
	return (
		<section className='wrapper mb-32'>
			<div className='mb-12'>
				<h2 className='mb-2 font-heading text-3xl font-semibold sm:text-4xl md:text-5xl'>Nasze rekomendacje</h2>
				<p className='max-w-prose text-pretty text-base text-muted-foreground'>
					Staramy się wybierać dla Ciebie najlepsze kierunki studiów. Zobacz, które kierunki są teraz najbardziej
					popularne i cieszą się największym zainteresowaniem. Może znajdziesz coś dla siebie?
				</p>
			</div>

			<div className='grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4'>
				{Array.from({ length: 8 }).map((_, i) => (
					<MajorCardSkeleton key={i} type='grid' />
				))}
			</div>
		</section>
	)
}
