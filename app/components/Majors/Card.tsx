import { Skeleton } from '@/app/components/ui/skeleton'
import { majorLevelEnum } from '@/app/constants/majorLevel'
import { urlFor } from '@/lib/supabase/getUrlFor'
import { cn } from '@/lib/utils/utils'
import { Major } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'
import { LikeButton } from './LikeButton'

export type MajorCardType = Pick<Major, 'name' | 'majorLevel' | 'isOnline' | 'slug'> & {
	qualifications: {
		slug: string
		name: string
	}[]
	unit: {
		name: string
	}
}

type Props = {
	data: MajorCardType
	likeable?: boolean
	type?: 'grid' | 'list'
	onDislike?: (slug: string) => void
}

const MajorCard = ({ data, likeable = true, type = 'grid', onDislike }: Props) => {
	const { name, isOnline, majorLevel, qualifications, slug, unit } = data

	return (
		<Link
			href={`/majors/${slug}`}
			className={cn(
				'group relative flex rounded-lg border p-3 duration-300 hover:shadow @2xl:gap-6 dark:hover:border-foreground/40',
				type === 'grid' && 'flex-col gap-4',
				type === 'list' && 'flex-row gap-6'
			)}>
			<div
				className={cn(
					'size-12 relative hidden shrink-0 overflow-hidden rounded-md @md:block',
					type === 'grid' && 'h-52 w-full',
					type === 'list' && 'size-36 @2xl:size-28 mt-1 @2xl:mt-0'
				)}>
				<Image
					src={urlFor('qualification_images', `${qualifications[0]?.slug}.jpg`).publicUrl}
					alt={`Zdjęcie kwalifikacji ${qualifications[0]?.name}`}
					width={400}
					height={400}
					className='pointer-events-none z-10 h-full w-full select-none object-cover'
				/>
				<Skeleton className='absolute inset-0 -z-10' />
			</div>

			<div>
				<h3 className='truncate-vertical-2 mb-2 text-base leading-tight'>{name}</h3>

				<div className='flex flex-col gap-1 dark:text-muted-foreground'>
					<div className='my-1 flex flex-wrap gap-1 gap-y-2 @md:my-0 @md:flex-col @md:gap-y-1'>
						<h4 className='shrink-0 text-xs'>
							<span className='[@container_(max-width:_28rem)]:sr-only'>Poziom: </span>
							<span className='[@container_(max-width:_28rem)]:rounded-full [@container_(max-width:_28rem)]:bg-muted [@container_(max-width:_28rem)]:px-1.5 [@container_(max-width:_28rem)]:py-0.5'>
								{majorLevelEnum[majorLevel]}
							</span>
						</h4>
						<h4 className='shrink-0 text-xs'>
							<span className='[@container_(max-width:_28rem)]:sr-only'>Tryb: </span>
							<span className='[@container_(max-width:_28rem)]:rounded-full [@container_(max-width:_28rem)]:bg-muted [@container_(max-width:_28rem)]:px-1.5 [@container_(max-width:_28rem)]:py-0.5'>
								{isOnline ? 'Online' : 'Stacjonarny'}
							</span>
						</h4>
					</div>
					<h4 className='my-1 text-xs'>
						<span>Kwalifikacje: </span>
						<span>
							{qualifications.map(
								(qualification, i, elements) => `${qualification.name}${i !== elements.length - 1 ? ', ' : ''}`
							)}
						</span>
					</h4>
				</div>
			</div>
			{likeable && (
				<LikeButton
					majorSlug={slug}
					onDislike={onDislike}
					className='absolute right-2 top-2 z-10 opacity-0 shadow-md active:shadow-sm group-hover:opacity-100'
				/>
			)}
		</Link>
	)
}

export default MajorCard
