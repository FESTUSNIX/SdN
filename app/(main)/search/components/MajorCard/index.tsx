import { Skeleton } from '@/app/components/ui/skeleton'
import { majorLevelEnum } from '@/app/constants/majorLevel'
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
			href={`/majors/${slug}`}
			className='flex flex-row gap-4 rounded-lg border p-3 duration-300 hover:shadow @2xl:gap-6 dark:hover:border-foreground/40'>
			<div className='relative mt-1 hidden h-12 w-12 shrink-0 @md:block @2xl:mt-0 @2xl:h-28 @2xl:w-28'>
				<Image
					src={urlFor('qualification_images', `${qualifications[0]?.slug}.jpg`).publicUrl}
					alt={`Zdjęcie kwalifikacji ${qualifications[0]?.name}`}
					width={200}
					height={200}
					className='pointer-events-none z-10 h-full w-full select-none rounded-lg object-cover'
				/>
				<Skeleton className='absolute inset-0 -z-10 rounded-lg' />
			</div>

			<div className=''>
				<h3 className='truncate-vertical-2 mb-2 text-base leading-tight'>{name}</h3>

				<div className='flex flex-col gap-1 dark:text-muted-foreground'>
					<div className='my-1 flex gap-1 @md:my-0 @md:flex-col'>
						<h4 className='text-xs'>
							<span className='[@container_(max-width:_28rem)]:sr-only'>Poziom: </span>
							<span className='[@container_(max-width:_28rem)]:rounded-full [@container_(max-width:_28rem)]:bg-muted [@container_(max-width:_28rem)]:px-1.5 [@container_(max-width:_28rem)]:py-0.5'>
								{majorLevelEnum[majorLevel]}
							</span>
						</h4>
						<h4 className='text-xs'>
							<span className='[@container_(max-width:_28rem)]:sr-only'>Tryb: </span>
							<span className='[@container_(max-width:_28rem)]:rounded-full [@container_(max-width:_28rem)]:bg-muted [@container_(max-width:_28rem)]:px-1.5 [@container_(max-width:_28rem)]:py-0.5'>
								{isOnline ? 'Online' : 'Stacjonarny'}
							</span>
						</h4>
					</div>
					<h4 className='my-1 text-xs'>
						<span className=''>Kwalifikacje: </span>
						<span className=''>
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
