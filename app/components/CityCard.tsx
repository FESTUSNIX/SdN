import { urlFor } from '@/lib/supabase/getUrlFor'
import { polishPlural } from '@/lib/utils'
import { City } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'
import { PlaceholderImage } from './PlaceholderImage'
import { Skeleton } from './ui/skeleton'
import { H3 } from './ui/Typography'

export type CityCardType = Pick<City, 'id' | 'name' | 'image'> & {
	unitsCount: number
	majorsCount: number
}

type Props = {
	data: CityCardType
}

export const CityCard = ({ data }: Props) => {
	return (
		<Link
			href={`/cities/${data.id}`}
			className='group relative aspect-[3/4] h-auto w-full overflow-hidden rounded-lg border px-3 py-2 duration-300 hover:shadow-sm'>
			<div className='relative z-10 flex h-full flex-col justify-end'>
				<H3 size='base' className='text-white'>
					{data.name}
				</H3>
				<div className='flex items-center gap-2 text-sm text-white'>
					<p>
						{data.unitsCount} {polishPlural('uczelnia', 'uczelnie', 'uczelni', data.unitsCount)}
					</p>
					<span>|</span>
					<p>
						{data.majorsCount} {polishPlural('kierunek', 'kierunki', 'kierunków', data.majorsCount)}
					</p>
				</div>
			</div>

			<div className='absolute inset-0 z-0 bg-black/25' />

			{data.image ? (
				<Image
					src={urlFor('cities', data.image).publicUrl}
					alt={data.name}
					width={1000}
					height={1000}
					className='absolute inset-0 -z-10 size-full object-cover duration-300 group-hover:scale-105'
				/>
			) : (
				<PlaceholderImage className='absolute inset-0 -z-10 size-full object-cover duration-300 group-hover:scale-105' />
			)}
			<Skeleton className='absolute inset-0 -z-20 size-full' />
		</Link>
	)
}
