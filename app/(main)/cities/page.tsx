import { H1 } from '@/app/components/ui/Typography'
import prisma from '@/prisma/client'
import { SearchParamsType } from '@/types'
import { unstable_cache } from 'next/cache'
import { CityResults } from './components/CityResults'

type Props = {
	searchParams: SearchParamsType
}

const getCachedCities = unstable_cache(
	async () => {
		return await prisma.city.findMany({
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
				image: true,
				voivodeshipId: true
			},
			orderBy: {
				name: 'asc'
			}
		})
	},
	[],
	{
		tags: ['cities'],
		revalidate: 60 * 60
	}
)

const CitiesPage = async ({ searchParams }: Props) => {
	const cityData = await getCachedCities()
	const cities = cityData.map(city => {
		const majorsCount = city.units.reduce((acc, unit) => acc + unit._count.majors, 0)

		return {
			...city,
			unitsCount: city.units.length,
			majorsCount
		}
	})

	return (
		<main className='wrapper'>
			<header className='py-16'>
				<H1 size='base'>Wykaz miast</H1>
			</header>

			<section>
				<h2 className='sr-only'>Lista miast</h2>

				<CityResults cities={cities} searchParams={searchParams} />
			</section>
		</main>
	)
}

export default CitiesPage
