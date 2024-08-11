import { Skeleton } from '@/app/components/ui/skeleton'
import { majorLevelEnum } from '@/app/constants/majorLevel'
import { urlFor } from '@/lib/supabase/getUrlFor'
import { cn } from '@/lib/utils'
import { Major } from '@prisma/client'
import { ScrollTextIcon, UniversityIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '../ui/Badge'
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
				'group relative flex gap-6 rounded-lg border p-3 duration-300 hover:shadow dark:hover:border-foreground/40',
				type === 'grid' && 'flex-col',
				type === 'list' && 'flex-row'
			)}>
			<div
				className={cn(
					'relative size-12 shrink-0 overflow-hidden rounded-md',
					type === 'grid' && 'h-52 w-full',
					type === 'list' && 'mt-1 hidden size-28 sm:block'
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
				<h3 className='truncate-vertical-2 mb-2 text-lg font-semibold leading-tight'>{name}</h3>

				<div className='mb-6 flex flex-wrap gap-2 gap-y-2'>
					<Badge variant={'secondary'}>
						<span className='sr-only'>Poziom: </span>
						<h4>{majorLevelEnum[majorLevel]}</h4>
					</Badge>
					<Badge variant={'secondary'}>
						<span className='sr-only'>Tryb: </span>
						<h4>{isOnline ? 'Online' : 'Stacjonarne'}</h4>
					</Badge>
				</div>

				<div className='space-y-2'>
					<div className='flex items-start gap-2 text-xs'>
						<UniversityIcon className='size-3.5 shrink-0' />
						<span className='sr-only'>Uczelnia: </span>
						<h4>{unit.name}</h4>
					</div>

					<div className='flex items-start gap-2 text-xs'>
						<ScrollTextIcon className='size-3.5 shrink-0' />
						<span className='sr-only'>Kwalifikacje: </span>
						<h4>
							{qualifications.map(
								(qualification, i, elements) => `${qualification.name}${i !== elements.length - 1 ? ', ' : ''}`
							)}
						</h4>
					</div>
				</div>
			</div>

			{likeable && (
				<LikeButton
					majorSlug={slug}
					onDislike={onDislike}
					className='absolute right-2 top-2 z-10 opacity-0 shadow-md focus-within:opacity-100 active:shadow-sm group-hover:opacity-100'
				/>
			)}
		</Link>
	)
}

export default MajorCard
