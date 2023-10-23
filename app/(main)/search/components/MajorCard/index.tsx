import { Skeleton } from '@/app/components/ui/skeleton'
import { majorLevelEnum } from '@/app/constants/majorLevelEnum'
import { urlFor } from '@/lib/supabase/getUrlFor'
import { cn } from '@/lib/utils/utils'
import { Major } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
	data: Pick<Major, 'name' | 'majorLevel' | 'isOnline' | 'slug'> & {
		qualifications: {
			slug: string
			name: string
		}[]
		unit: {
			name: string
		}
	}
	type?: 'grid' | 'list'
}

const MajorCard = ({ data, type = 'grid' }: Props) => {
	const { name, isOnline, majorLevel, qualifications, slug, unit } = data

	return (
		<Link
			href={`majors/${slug}`}
			className={cn(
				'flex rounded-lg p-3 duration-300 hover:shadow dark:border dark:border-transparent dark:hover:border-border',
				type === 'grid' && 'flex-col gap-4',
				type === 'list' && 'flex-row gap-6'
			)}>
			<div className={cn('relative', type === 'grid' && 'h-52 w-full', type === 'list' && 'h-36 w-36')}>
				<Image
					src={urlFor('qualification_images', `${qualifications[0]?.slug}.jpg`).publicUrl}
					alt={`Zdjęcie kwalifikacji ${qualifications[0]?.name}`}
					width={700}
					height={400}
					className='pointer-events-none z-10 h-full w-full select-none rounded-lg object-cover'
				/>
				<Skeleton className='absolute inset-0 -z-10 rounded-lg' />
			</div>

			<div className=''>
				<div className='mb-1 truncate text-xs'>{unit.name}</div>

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
