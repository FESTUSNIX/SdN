import { H1, H2, H3 } from '@/app/components/ui/Typography'
import { urlFor } from '@/lib/supabase/getUrlFor'
import prisma from '@/prisma/client'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import { CityUnits } from './components/CityUnits'
import { CityUnitsSkeleton } from './components/CityUnitsSkeleton'

type Props = { params: { id: string } }

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
			},
			image: true,
			description: true
		}
	})

	if (!city) return notFound()

	const majorsCount = city.units.reduce((acc, unit) => acc + unit._count.majors, 0)

	return (
		<main className='wrapper'>
			<header className='py-16'>
				{city.image && (
					<div className='relative mb-12 aspect-[2/1] h-auto w-full overflow-hidden rounded-lg border md:rounded-xl'>
						<Image
							src={urlFor('cities', city.image).publicUrl}
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

				<p className='max-w-3xl text-pretty text-muted-foreground'>{city.description}</p>
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
