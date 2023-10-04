import { Skeleton } from '@/app/components/ui/skeleton'
import { MajorLevel } from '@prisma/client'
import MajorCard from '../MajorCard'

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
}

const Results = ({ majors }: Props) => {
	return (
		<div className='grid grid-cols-3 gap-x-1 gap-y-2'>
			{!majors &&
				Array(10)
					.fill(0)
					.map((_, i) => (
						<div key={i} className='p-3'>
							<Skeleton className='h-52 rounded-lg' />
							<div className='py-2'>
								<Skeleton className='mb-1.5 mt-1 h-4' />
								<Skeleton className='mb-4 h-5 w-4/5' />

								<div className='flex flex-col gap-1'>
									<Skeleton className='h-3.5 w-2/3' />
									<Skeleton className='h-3.5 w-3/4' />
									<Skeleton className='h-3.5 w-2/4' />
								</div>
							</div>
						</div>
					))}

			{majors &&
				majors?.map(major => (
					<MajorCard
						key={major.slug}
						name={major.name}
						slug={major.slug}
						isOnline={major.isOnline}
						majorLevel={major.majorLevel}
						qualifications={major.qualifications}
						unit={major.unit}
					/>
				))}
		</div>
	)
}

export default Results
