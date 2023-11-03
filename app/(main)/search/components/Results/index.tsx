import { cn } from '@/lib/utils/utils'
import { MajorLevel } from '@prisma/client'
import { Suspense } from 'react'
import MajorCard from '../MajorCard'
import MajorCardSkeleton from '../MajorCardSkeleton'

type Props = {
	majors:
		| {
				name: string
				isOnline: boolean
				majorLevel: MajorLevel
				slug: string
				unit: {
					name: string
				}
				qualifications: {
					name: string
					slug: string
				}[]
		  }[]
		| undefined

	listType: 'grid' | 'list'
}

const Results = ({ majors, listType }: Props) => {
	return (
		<div
			className={cn(
				'grid gap-x-1 gap-y-2 @container',
				listType === 'grid' && 'grid-cols-3',
				listType === 'list' && 'grid-cols-1'
			)}>
			<Suspense
				fallback={Array(10)
					.fill(0)
					.map((_, i) => (
						<MajorCardSkeleton key={i} type={listType} />
					))}>
				{majors &&
					majors.length > 0 &&
					majors?.map(major => (
						<MajorCard
							key={major.slug}
							data={{
								name: major.name,
								slug: major.slug,
								isOnline: major.isOnline,
								majorLevel: major.majorLevel,
								qualifications: major.qualifications,
								unit: major.unit
							}}
							type={listType}
						/>
					))}
			</Suspense>
		</div>
	)
}

export default Results
