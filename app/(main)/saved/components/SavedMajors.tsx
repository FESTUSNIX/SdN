'use client'

import MajorCard, { MajorCardType } from '@/app/components/Majors/Card'
import MajorsGrid from '@/app/components/Majors/Grid'
import { getLocalStorage } from '@/lib/utils/utils'
import { useEffect, useState } from 'react'
import { getSavedMajors } from '../getSavedMajors'

type Props = {}

export const SavedMajors = (props: Props) => {
	const [savedMajors, setSavedMajors] = useState<MajorCardType[]>([])

	useEffect(() => {
		const localStorageMajors = getLocalStorage('likedMajors', [])

		getSavedMajors(localStorageMajors).then(majors => {
			setSavedMajors(majors)
		})
	}, [])

	return (
		<MajorsGrid listType='grid' className='xl:grid-cols-4'>
			{savedMajors &&
				savedMajors.length > 0 &&
				savedMajors?.map(major => (
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
						type={'grid'}
						onDislike={slug => {
							setSavedMajors(savedMajors.filter(major => major.slug !== slug))
						}}
					/>
				))}
		</MajorsGrid>
	)
}
