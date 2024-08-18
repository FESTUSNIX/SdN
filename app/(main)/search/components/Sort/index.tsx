'use client'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select'
import { useDebounce } from '@/app/hooks/useDebounce'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState, useTransition } from 'react'
import { useTransitionLoading } from '../../context/TransitionLoadingContext'

const options: {
	value: string
	label: string
}[] = [
	{
		value: 'default',
		label: 'Sortowanie domyślne'
	},
	{
		value: 'name.asc',
		label: 'Nazwa: Rosnąco'
	},
	{
		value: 'name.desc',
		label: 'Nazwa: Malejąco'
	},
	{
		value: 'cost.asc',
		label: 'Cena: Malejąco'
	},
	{
		value: 'cost.desc',
		label: 'Cena: Malejąco'
	}
]

const Sort = () => {
	const router = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()!
	const [isPending, startTransition] = useTransition()
	const [currentSort, setCurrentSort] = useState('default')
	const debouncedCurrentSort = useDebounce(currentSort, 0)

	const { startLoading, stopLoading } = useTransitionLoading()

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
		startTransition(() => {
			router.push(
				`${pathname}?${createQueryString('sort', debouncedCurrentSort === 'default' ? '' : debouncedCurrentSort)}`,
				{
					scroll: false
				}
			)
		})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [debouncedCurrentSort])

	useEffect(() => {
		isPending ? startLoading() : stopLoading()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isPending])

	return (
		<div className='shrink-0'>
			<Select onValueChange={setCurrentSort} value={currentSort} defaultValue={options[0].value}>
				<SelectTrigger className='h-9 w-[190px] rounded-full py-2'>
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

export default Sort
