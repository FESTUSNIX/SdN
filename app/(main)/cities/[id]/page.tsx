import { Skeleton } from '@/app/components/ui/skeleton'
import { H1, H2, H3 } from '@/app/components/ui/Typography'
import prisma from '@/prisma/client'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import { CityUnits } from './components/CityUnits'

type Props = { params: { id: string } }

const CITY_IMAGES = {
	88: 'warszawa.jpg',
	32: 'krakow.jpg',
	92: 'wroclaw.jpg',
	56: 'poznan.jpg'
}

const CityPage = async ({ params }: Props) => {
	const city = await prisma.city.findFirst({
		where: {
			id: parseInt(params.id)
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

	if (!city) return notFound()

	const majorsCount = city.units.reduce((acc, unit) => acc + unit._count.majors, 0)

	const image = CITY_IMAGES[city.id as keyof typeof CITY_IMAGES]

	return (
		<main className='wrapper'>
			<header className='py-16'>
				{image && (
					<div className='relative mb-12 aspect-[2/1] h-auto w-full overflow-hidden rounded-lg border md:rounded-xl'>
						<Image
							src={`/images/cities/${image}`}
							alt={city.name}
							width={1400}
							height={600}
							className='size-full object-cover'
						/>
						<div className='absolute inset-0 bg-black/25' />
					</div>
				)}

				<H1 size='base'>{city.name}</H1>

				<div className='my-6 flex flex-wrap items-center gap-4 gap-y-1'>
					<H3 size='base'>{city.units.length} uczelni</H3>
					<span className='text-muted-foreground'>|</span>
					<H3 size='base'>{majorsCount} kierunków</H3>
				</div>

				<p className='max-w-3xl text-pretty text-muted-foreground'>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum qui beatae quod animi ipsa culpa temporibus
					voluptas delectus, nesciunt fugit aut natus? Impedit ullam iusto blanditiis nisi voluptatum libero architecto,
					tempore doloremque perspiciatis vel nihil corrupti nobis? Quod consequuntur expedita nesciunt inventore facere
					distinctio magnam nihil fugiat, odit reprehenderit hic.
				</p>
			</header>

			<section>
				<H2 size='base' className='mb-6'>
					Uczelnie w mieście
				</H2>

				<Suspense fallback={<CityUnitsSkeleton />}>
					<CityUnits cityId={city.id} />
				</Suspense>
			</section>
		</main>
	)
}

export default CityPage

export const CityUnitsSkeleton = () => {
	return (
		<div>
			<Skeleton className='mb-8 h-14 w-full rounded-full' />
			<div className='grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-3'>
				{Array.from({ length: 9 }).map((_, index) => (
					<div key={index} className='flex gap-4 rounded-lg border p-2'>
						<Skeleton className='size-24 shrink-0 overflow-hidden rounded-md border' />

						<div>
							<Skeleton className='h-4 w-40' />
							<Skeleton className='mt-1 h-4 w-24' />
							<Skeleton className='mt-3 h-2 w-20' />
						</div>
					</div>
				))}
			</div>
		</div>
	)
}
