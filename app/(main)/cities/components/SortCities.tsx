'use client'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'

type Props = {
	defaultValue?: string
}

const options: {
	value: string
	label: string
}[] = [
	{
		value: 'name.asc',
		label: 'Nazwa: Rosnąco'
	},
	{
		value: 'name.desc',
		label: 'Nazwa: Malejąco'
	},
	{
		value: 'unitsCount.asc',
		label: 'Uczelnie: Rosnąco'
	},
	{
		value: 'unitsCount.desc',
		label: 'Uczelnie: Malejąco'
	},
	{
		value: 'majorsCount.asc',
		label: 'Kierunki: Rosnąco'
	},
	{
		value: 'majorsCount.desc',
		label: 'Kierunki: Malejąco'
	}
]

const SortCities = ({ defaultValue = 'name.asc' }: Props) => {
	const router = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()!
	const [currentSort, setCurrentSort] = useState(defaultValue)

	const createQueryString = useCallback(
		(name: string, value: string) => {
			const params = new URLSearchParams(searchParams)

			if (value === null || !value) {
				params.delete(name)
			} else {
				params.set(name, value)
			}

			return params.toString()
		},
		[searchParams]
	)

	useEffect(() => {
		const params = new URLSearchParams(searchParams)
		const sortParam = params.get('sort') ?? ''

		sortParam && setCurrentSort(sortParam)
	}, [searchParams])

	useEffect(() => {
		router.push(`${pathname}?${createQueryString('sort', currentSort === defaultValue ? '' : currentSort)}`)

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentSort])

	return (
		<div className='shrink-0'>
			<Select onValueChange={setCurrentSort} value={currentSort} defaultValue={options[0].value}>
				<SelectTrigger className='h-9 w-[200px] rounded-full py-2'>
					<SelectValue placeholder='Sortowanie' />
				</SelectTrigger>
				<SelectContent>
					{options.map(item => (
						<SelectItem key={item.value} value={item.value} className=''>
							{item.label}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	)
}

export default SortCities
