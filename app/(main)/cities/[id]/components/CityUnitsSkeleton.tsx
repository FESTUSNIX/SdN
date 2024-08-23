import { Skeleton } from '@/app/components/ui/skeleton'

export const CityUnitsSkeleton = () => {
	return (
		<div>
			<Skeleton className='mb-8 h-14 w-full rounded-full' />
			<div className='grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-3'>
				{Array.from({ length: 9 }).map((_, index) => (
					<div key={index} className='flex gap-4 rounded-lg border p-2'>
						<Skeleton className='size-24 shrink-0 overflow-hidden rounded-md border' />

						<div>
							<Skeleton className='h-4 w-40' />
							<Skeleton className='mt-1 h-4 w-24' />
							<Skeleton className='mt-3 h-2 w-20' />
						</div>
					</div>
				))}
			</div>
		</div>
	)
}
