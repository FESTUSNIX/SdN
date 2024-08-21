import { Skeleton } from '@/app/components/ui/skeleton'
import { majorLevelEnum } from '@/app/constants/majorLevel'
import { urlFor } from '@/lib/supabase/getUrlFor'
import { cn } from '@/lib/utils'
import { Major } from '@prisma/client'
import { CrownIcon, GraduationCapIcon, MonitorIcon, SchoolIcon, ScrollTextIcon, StarIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { PlaceholderImage } from '../PlaceholderImage'
import { Badge } from '../ui/badge'
import { LikeButton } from './LikeButton'

export type MajorCardType = Pick<Major, 'name' | 'majorLevel' | 'isOnline' | 'slug'> & {
	qualifications: {
		slug: string
		name: string
	}[]
	unit: {
		name: string
		subscriptions?: {
			type: 'PREMIUM' | 'STANDARD' | string
		}[]
	}
}

type Props = {
	data: MajorCardType
	likeable?: boolean
	type?: 'grid' | 'list'
	onDislike?: (slug: string) => void
	className?: string
	hideBadges?: boolean
}

const MajorCard = ({ data, likeable = true, type = 'grid', onDislike, className, hideBadges = false }: Props) => {
	const { name, isOnline, majorLevel, qualifications, slug, unit } = data

	const isPromoted = unit.subscriptions?.some(subscription => subscription.type === 'STANDARD')
	const isPremium = unit.subscriptions?.some(subscription => subscription.type === 'PREMIUM')

	return (
		<Link
			href={`/majors/${slug}`}
			className={cn(
				'group relative flex gap-4 overflow-hidden rounded-lg border outline-none duration-300 hover:shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 dark:hover:border-foreground/40',
				type === 'grid' && 'flex-col',
				type === 'list' && 'flex-row',
				className
			)}>
			{!hideBadges && isPromoted && (
				<Badge className='absolute z-20 hover:bg-primary max-sm:bottom-2 max-sm:right-2 sm:left-2 sm:top-2'>
					<span className='max-sm:sr-only'>Wyróżnione</span>
					<StarIcon className='size-3 fill-primary-foreground sm:hidden' />
				</Badge>
			)}
			{isPremium && (
				<Badge
					variant={'alternative'}
					className='absolute z-20 hover:bg-alternative max-sm:bottom-2 max-sm:right-2 sm:left-2 sm:top-2'>
					<span className='max-sm:sr-only'>Premium</span>
					<CrownIcon className='size-3 fill-alternative-foreground sm:hidden' />
				</Badge>
			)}
			<div
				className={cn(
					'relative size-12 shrink-0 overflow-hidden',
					type === 'grid' && 'h-52 w-full rounded-t-md',
					type === 'list' && 'm-3 mr-0 mt-4 hidden size-28 rounded-md sm:block'
				)}>
				{qualifications[0]?.slug === 'inne_do_sprawdzenia' ? (
					<PlaceholderImage
						className='pointer-events-none z-10 h-full w-full border-none duration-300 group-hover:scale-105'
						iconClassName='h-1/5 w-auto'
					/>
				) : (
					<Image
						src={urlFor('qualification_images', `${qualifications[0]?.slug}.jpg`).publicUrl}
						alt={`Zdjęcie kwalifikacji ${qualifications[0]?.name}`}
						width={400}
						height={400}
						className='pointer-events-none z-10 h-full w-full select-none object-cover duration-300 group-hover:scale-105'
					/>
				)}
				<Skeleton className='absolute inset-0 -z-10 rounded-none' />
			</div>

			<div className={cn('', type === 'grid' && 'px-3 pb-3', type === 'list' && 'p-3 sm:pl-0')}>
				<h3 title={name} className='truncate-vertical-2 mb-1 text-lg font-semibold leading-tight'>
					{name}
				</h3>

				<div className='mb-4 text-sm'>
					<span className='sr-only'>Uczelnia: </span>
					<h4>{unit.name}</h4>
				</div>

				<div className='mt-auto flex max-w-full flex-col gap-y-1'>
					<div className='flex items-center gap-4'>
						<div className='flex w-max max-w-full items-start gap-2 text-xs'>
							<GraduationCapIcon className='size-3.5 shrink-0' />
							<span className='sr-only'>Poziom: </span>
							<h4>{majorLevelEnum[majorLevel]}</h4>
						</div>
						<div className='flex w-max max-w-full items-start gap-2 text-xs'>
							{isOnline ? <MonitorIcon className='size-3.5 shrink-0' /> : <SchoolIcon className='size-3.5 shrink-0' />}
							<span className='sr-only'>Tryb: </span>
							<h4>{isOnline ? 'Online' : 'Stacjonarne'}</h4>
						</div>
					</div>
					<div className='flex w-max max-w-full items-start gap-2 text-xs'>
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
					className='absolute right-2 top-2 z-10 rounded-full opacity-0 shadow-md focus-within:opacity-100 active:shadow-sm group-hover:opacity-100'
				/>
			)}
		</Link>
	)
}

export default MajorCard
