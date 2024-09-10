'use client'

import { CityCard, CityCardType } from '@/app/components/CityCard'
import { Input } from '@/app/components/ui/input'
import { SearchIcon } from 'lucide-react'
import { useState } from 'react'

type Props = {
	cities: CityCardType[]
}

export const CityResults = ({ cities }: Props) => {
	const [query, setQuery] = useState('')
	const [filteredCities, setFilteredCities] = useState(cities)

	const testCity = (city: CityCardType, newQuery: string) => {
		if (newQuery === '') return true

		return city.name.toLowerCase().includes(newQuery.toLowerCase())
	}

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		const query = e.target.value
		setQuery(query)
		setFilteredCities(cities.filter(city => testCity(city, query.trim())))
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
				{filteredCities.length > 0 ? (
					<div className='grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4'>
						{filteredCities.map((city, i) => (
							<CityCard data={city} key={i} />
						))}
					</div>
				) : (
					<p>Nie odnalezliśmy żadnych miast spełniających &quot;{query}&quot;.</p>
				)}
			</div>
		</div>
	)
}
