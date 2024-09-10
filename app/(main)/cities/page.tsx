import { H1 } from '@/app/components/ui/Typography'
import prisma from '@/prisma/client'
import { unstable_cache } from 'next/cache'
import { CityResults } from './[id]/components/CityResults'

type Props = {}

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
				description: true
			},
			orderBy: {
				name: 'asc'
			}
		})
	},
	[],
	{
		tags: ['cities'],
		// an hour
		revalidate: 60 * 60
	}
)

const CitiesPage = async ({}: Props) => {
	const cityData = await getCachedCities()

	const cities = cityData.map(city => {
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

	return (
		<main className='wrapper'>
			<header className='py-16'>
				<H1 size='base'>Wykaz miast ({cities.length})</H1>
			</header>

			<section>
				<h2 className='sr-only'>Lista miast</h2>

				<CityResults cities={cities} />
			</section>
		</main>
	)
}

export default CitiesPage
