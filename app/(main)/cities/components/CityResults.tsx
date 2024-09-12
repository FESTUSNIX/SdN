'use client'

import { CityCard, CityCardType } from '@/app/components/CityCard'
import SearchBar from '@/app/components/SearchBar'
import { getFirstParamValue } from '@/lib/utils'
import { SearchParamsType } from '@/types'
import { Suspense } from 'react'
import SortCities from './SortCities'
import { VoiovodeshipFilter } from './VoivodeshipFilter'

type CityWithVoivodeship = CityCardType & { voivodeshipId: number }

type Props = {
	cities: CityWithVoivodeship[]
	searchParams: SearchParamsType
}

export const CityResults = ({ cities, searchParams }: Props) => {
	const voivodeshipsParam = getFirstParamValue(searchParams.voivodeship, '')
	const voivodeships = voivodeshipsParam ? voivodeshipsParam.split('.') : undefined

	const [orderByKey, orderByValue] = searchParams.sort?.toString().split('.') ?? []
	const orderBy = orderByKey && orderByValue ? { [orderByKey]: orderByValue } : undefined

	const query = getFirstParamValue(searchParams.cityName, '') ?? ''

	const filterCities = (cities: CityWithVoivodeship[]) => {
		let newCities = cities.filter(city => city.unitsCount > 0)

		if (voivodeships) newCities = newCities.filter(city => voivodeships.includes(city.voivodeshipId.toString()))
		if (query) newCities = newCities.filter(city => !query || city.name.toLowerCase().includes(query.toLowerCase()))

		return newCities
	}

	const compareCities = (a: CityWithVoivodeship, b: CityWithVoivodeship) => {
		if (!orderBy) return 0

		const [key, value] = Object.entries(orderBy)[0]

		const aKey = a[key as keyof CityCardType]
		const bKey = b[key as keyof CityCardType]

		if (aKey === null || bKey === null) return 0

		if (typeof aKey === 'string' && typeof bKey === 'string') {
			return value === 'asc' ? aKey.localeCompare(bKey) : bKey.localeCompare(aKey)
		}

		if (typeof aKey === 'number' && typeof bKey === 'number') {
			return value === 'asc' ? aKey - bKey : bKey - aKey
		}

		return 0
	}

	const filteredCities = filterCities(cities).sort(compareCities)

	return (
		<div>
			<SearchBar debounceTime={0} param='cityName' className='mb-4' />

			<div className='mb-8 flex flex-wrap items-center justify-between gap-x-8 gap-y-2'>
				<Suspense>
					<VoiovodeshipFilter defaultValues={voivodeships} />
				</Suspense>

				<Suspense>
					<SortCities />
				</Suspense>
			</div>

			<div>
				{filteredCities.length > 0 ? (
					<div className='grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4'>
						{filteredCities.map((city, i) => (
							<CityCard data={city} key={i} />
						))}
					</div>
				) : (
					<p>Nie odnalezliśmy żadnych miast spełniających warunki.</p>
				)}
			</div>
		</div>
	)
}
