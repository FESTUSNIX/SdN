import MajorCard from '@/app/components/Majors/Card'
import MajorsGrid from '@/app/components/Majors/Grid'
import { ResultsLoading } from '@/app/components/Majors/ResultsLoading'
import { H3 } from '@/app/components/ui/Typography'
import { Major, Qualification, Unit } from '@prisma/client'
import React from 'react'

type Props = {
	majors: (Pick<Major, 'name' | 'slug' | 'isOnline' | 'majorLevel'> & {
		unit: Pick<Unit, 'name'>
		qualifications: Pick<Qualification, 'name' | 'slug'>[]
	})[]
	listType: 'grid' | 'list'
}

export const Results = async ({ majors, listType }: Props) => {
	if (!majors.length) {
		return (
			<div className='mx-auto py-4 text-center'>
				<H3>Nie udało się odnaleźć kierunku z podanymi kryteriami</H3>
				<p className='text-muted-foreground'>Usuń wybrane filtry aby przywrócić wszystkie wyniki</p>
			</div>
		)
	}

	return (
		<>
			<div>
				<ResultsLoading listType={listType}>
					<MajorsGrid listType={listType}>
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
					</MajorsGrid>
				</ResultsLoading>
			</div>
		</>
	)
}
