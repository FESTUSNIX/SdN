import { CityCard, CityCardSkeleton } from '@/app/components/CityCard'
import { RECOMMENDED_CITIES } from '@/app/constants/CONFIG'
import prisma from '@/prisma/client'
import { ArrowUpRight } from 'lucide-react'
import { unstable_cache } from 'next/cache'
import Link from 'next/link'

type Props = {}

const getCachedCities = unstable_cache(
	async () => {
		return await prisma.city.findMany({
			where: {
				id: {
					in: RECOMMENDED_CITIES
				}
			},
			select: {
				id: true,
				name: true,
				units: {
					select: {
						_count: {
							select: {
								majors: true
							}
						}
					}
				},
				image: true
			}
		})
	},
	[],
	{
		tags: ['cityRecommendations'],
		// a week
		revalidate: 60 * 60 * 24 * 7
	}
)

export const CityRecommendations = async (props: Props) => {
	const cityData = await getCachedCities()

	const cities = cityData
		.map(city => {
			const { name, units, id, image } = city

			const majorsCount = units.reduce((acc, unit) => acc + unit._count.majors, 0)

			return {
				id,
				name,
				unitsCount: units.length,
				majorsCount,
				image
			}
		})
		.sort((a, b) => RECOMMENDED_CITIES.indexOf(a.id) - RECOMMENDED_CITIES.indexOf(b.id))

	return (
		<section className='wrapper mb-32'>
			<div className='mb-12'>
				<h2 className='mb-2 font-heading text-3xl font-semibold sm:text-4xl md:text-5xl'>
					Polecane miasta akademickie
				</h2>
				<p className='max-w-prose text-pretty text-base text-muted-foreground'>
					W Polsce znajduje się wiele miast, które są popularne wśród studentów. Wyróżniają się one różnymi atrakcjami,
					klimatem, a także liczbą uczelni. Warto zwrócić uwagę na takie miasta jak: Kraków, Wrocław, Warszawa czy
					Poznań. W każdym z nich znajdziesz coś dla siebie!
				</p>
			</div>

			<div className='grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4'>
				{cities.map((city, i) => (
					<CityCard data={city} key={i} />
				))}
			</div>

			<Link href='/cities' className='mt-6 flex w-max items-center gap-2 text-lg font-semibold hover:underline'>
				<span>Przeglądaj wszystkie miasta</span>
				<ArrowUpRight className='size-4' />
			</Link>
		</section>
	)
}

export const CityRecommendationsSkeleton = () => {
	return (
		<section className='wrapper mb-32'>
			<div className='mb-12'>
				<h2 className='mb-2 font-heading text-3xl font-semibold sm:text-4xl md:text-5xl'>
					Polecane miasta akademickie
				</h2>
				<p className='max-w-prose text-pretty text-base text-muted-foreground'>
					W Polsce znajduje się wiele miast, które są popularne wśród studentów. Wyróżniają się one różnymi atrakcjami,
					klimatem, a także liczbą uczelni. Warto zwrócić uwagę na takie miasta jak: Kraków, Wrocław, Warszawa czy
					Poznań. W każdym z nich znajdziesz coś dla siebie!
				</p>
			</div>

			<div className='grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4'>
				{[...Array(4).keys()].map(i => (
					<CityCardSkeleton key={i} />
				))}
			</div>

			<Link href='/cities' className='mt-6 flex w-max items-center gap-2 text-lg font-semibold hover:underline'>
				<span>Przeglądaj wszystkie miasta</span>
				<ArrowUpRight className='size-4' />
			</Link>
		</section>
	)
}
