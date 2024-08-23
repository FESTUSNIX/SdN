import { Skeleton } from '@/app/components/ui/skeleton'
import { H3 } from '@/app/components/ui/Typography'
import prisma from '@/prisma/client'
import Image from 'next/image'
import Link from 'next/link'

type Props = {}

// Warszawa, Kraków, Wrocław, Poznań
const CITY_IDS = [88, 32, 92, 56]
const CITY_IMAGES = {
	88: 'warszawa.jpg',
	32: 'krakow.jpg',
	92: 'wroclaw.jpg',
	56: 'poznan.jpg'
}

export const CityRecommendations = async (props: Props) => {
	const cityData = await prisma.city.findMany({
		where: {
			id: {
				in: CITY_IDS
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
			}
		}
	})

	const cities = cityData
		.map(city => {
			const { name, units, id } = city

			const majorsCount = units.reduce((acc, unit) => acc + unit._count.majors, 0)

			return {
				id,
				name,
				unitsCount: units.length,
				majorsCount
			}
		})
		.sort((a, b) => CITY_IDS.indexOf(a.id) - CITY_IDS.indexOf(b.id))

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

			<div className='grid grid-cols-4 gap-2'>
				{cities.map((city, i) => (
					<Link
						href={`/cities/${city.id}`}
						key={i}
						className='group relative aspect-[3/4] h-auto w-full overflow-hidden rounded-lg border px-3 py-2 duration-300 hover:shadow-sm'>
						<div className='relative z-10 flex h-full flex-col justify-end'>
							<H3 size='base' className='text-white'>
								{city.name}
							</H3>
							<div className='flex items-center gap-2 text-sm text-white'>
								<p>{city.unitsCount} uczelni</p>
								<span>|</span>
								<p>{city.majorsCount} kierunki</p>
							</div>
						</div>

						<div className='absolute inset-0 z-0 bg-black/25' />
						<Image
							src={`/images/cities/${CITY_IMAGES[city.id as keyof typeof CITY_IMAGES]}`}
							alt={city.name}
							width={800}
							height={800}
							className='absolute inset-0 -z-10 size-full object-cover duration-300 group-hover:scale-105'
						/>
						<Skeleton className='absolute inset-0 -z-20 size-full' />
					</Link>
				))}
			</div>
		</section>
	)
}
