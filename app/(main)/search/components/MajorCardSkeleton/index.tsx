import { Skeleton } from '@/app/components/ui/skeleton'
import { cn } from '@/lib/utils/utils'
import React from 'react'

type Props = {
	type?: 'grid' | 'list'
}

const MajorCardSkeleton = ({ type = 'grid' }: Props) => {
	return (
		<div className={cn('flex p-3', type === 'grid' && 'flex-col gap-4', type === 'list' && 'flex-row gap-6')}>
			<Skeleton className={cn('rounded-lg', type === 'grid' && 'h-52 w-full', type === 'list' && 'h-36 w-36')} />

			<div className={cn('w-full', type === 'list' && 'max-w-xs')}>
				<Skeleton className='mb-1.5 mt-1 h-3' />
				<Skeleton className='mb-4 h-5 w-4/5' />

				<div className='flex flex-col gap-1'>
					<Skeleton className='h-3.5 w-2/3' />
					<Skeleton className='h-3.5 w-3/4' />
					<Skeleton className='h-3.5 w-2/4' />
				</div>
			</div>
		</div>
	)
}

export default MajorCardSkeleton
