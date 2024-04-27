import { cn } from '@/lib/utils/utils'
import { Suspense } from 'react'
import MajorCardSkeleton from './CardSkeleton'

type Props = {
	children: React.ReactNode
	listType: 'grid' | 'list'
	className?: string
}

const MajorsGrid = ({ children, listType, className }: Props) => {
	return (
		<div
			className={cn(
				'grid gap-x-1 gap-y-2 @container',
				listType === 'grid' && 'grid-cols-1 min-[560px]:grid-cols-2 md:grid-cols-3',
				listType === 'list' && 'grid-cols-1',
				className
			)}>
			<Suspense
				fallback={Array(10)
					.fill(0)
					.map((_, i) => (
						<MajorCardSkeleton key={i} type={listType} />
					))}>
				{children}
			</Suspense>
		</div>
	)
}

export default MajorsGrid
