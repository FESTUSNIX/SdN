import { Skeleton } from '@/app/components/ui/skeleton'
import { majorLevelEnum } from '@/app/constants/majorLevelEnum'
import { urlFor } from '@/lib/supabase/getUrlFor'
import { Major } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'

type Props = Pick<Major, 'name' | 'majorLevel' | 'isOnline' | 'slug'> & {
	qualifications: {
		slug: string
		name: string
	}[]
	unit: {
		name: string
	}
}

const MajorCard = ({ name, isOnline, majorLevel, qualifications, slug, unit }: Props) => {
	return (
		<Link href={`majors/${slug}`} className='rounded-lg p-3 duration-300 hover:shadow'>
			<div className='relative h-52 w-full'>
				<Image
					src={urlFor('qualification_images', `${qualifications[0]?.slug}.jpg`).publicUrl}
					alt={`Zdjęcie kwalifikacji ${qualifications[0]?.name}`}
					width={700}
					height={400}
					className='pointer-events-none z-10 h-full w-full select-none rounded-lg object-cover'
				/>
				<Skeleton className='absolute inset-0 -z-10 rounded-lg' />
			</div>

			<div className='py-2'>
				<div className='mb-1 truncate text-sm'>{unit.name}</div>

				<h3 className='truncate-vertical-2 mb-4 text-base leading-tight'>{name}</h3>

				<div className='flex flex-col gap-1'>
					<h4 className='text-xs'>Poziom: {majorLevelEnum[majorLevel]}</h4>
					<h4 className='text-xs'>Tryb: {isOnline ? 'Online' : 'Stacjonarny'}</h4>
					<h4 className='text-xs'>
						Kwalifikacje:{' '}
						<span>
							{qualifications.map(
								(qualification, i, elements) => `${qualification.name}${i !== elements.length - 1 ? ', ' : ''}`
							)}
						</span>
					</h4>
				</div>
			</div>
		</Link>
	)
}

export default MajorCard
