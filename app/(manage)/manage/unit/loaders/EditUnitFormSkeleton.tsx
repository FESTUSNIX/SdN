import { Separator } from '@/app/components/ui/Separator/separator'
import { Skeleton } from '@/app/components/ui/skeleton'
import { cn } from '@/lib/utils/utils'
import React from 'react'

type Props = {
	className?: string
}

const EditUnitFormSkeleton = ({ className }: Props) => {
	return (
		<div className={cn('h-[1000px] rounded-md border bg-card p-2 px-4 py-2.5', className)}>
			<div className='flex flex-col'>
				<Skeleton className='my-2 h-6 w-36' />
				<Separator className='mb-6 mt-2.5' />
			</div>

			<div className='space-y-6'>
				{Array(10)
					.fill(0)
					.map((_, i) => (
						<div key={i} className='space-y-2'>
							<Skeleton className='h-3.5 w-24' />
							<Skeleton className='h-10 w-full' />
						</div>
					))}
			</div>
		</div>
	)
}

export default EditUnitFormSkeleton
