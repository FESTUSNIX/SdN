'use client'

import MajorCard, { MajorCardType } from '@/app/components/Majors/Card'
import MajorsGrid from '@/app/components/Majors/Grid'
import { Input } from '@/app/components/ui/input'
import { SearchIcon } from 'lucide-react'
import { useState } from 'react'

type Props = {
	majors: MajorCardType[]
}

export const Results = ({ majors }: Props) => {
	const [query, setQuery] = useState('')
	const [filteredMajors, setFilteredMajors] = useState(majors)

	const testMajor = (major: MajorCardType, newQuery: string) => {
		if (newQuery === '') return true

		return (
			major.name.toLowerCase().includes(newQuery.toLowerCase()) ||
			major.qualifications.some(qualification => qualification.name.toLowerCase().includes(newQuery.toLowerCase()))
		)
	}

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		const query = e.target.value
		setQuery(query)

		setFilteredMajors(majors.filter(major => testMajor(major, query.trim())))
	}

	return (
		<div>
			<div className='relative mb-8 grow'>
				<SearchIcon className='pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 select-none text-muted-foreground' />
				<Input
					placeholder={`Szukaj`}
					value={query}
					onChange={handleSearch}
					className='h-auto rounded-full py-4 pl-12 pr-6'
				/>
			</div>

			<div>
				{majors.length > 0 ? (
					<MajorsGrid listType='grid'>
						{filteredMajors.map(major => (
							<MajorCard key={major.slug} data={major} type='grid' />
						))}
					</MajorsGrid>
				) : (
					<p>Nie odnalezliśmy żadnych kierunków w tej jednostce</p>
				)}
			</div>
		</div>
	)
}
