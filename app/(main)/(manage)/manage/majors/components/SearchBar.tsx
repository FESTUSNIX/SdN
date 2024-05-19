'use client'

import { Input } from '@/app/components/ui/Input'
import { useDebounce } from '@/app/hooks/useDebounce'
import { Search as SearchIcon } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { ChangeEvent, useCallback, useEffect, useState } from 'react'

export const SearchBar = () => {
	const router = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()!

	const [query, setQuery] = useState('')
	const debouncedQuery = useDebounce(query, 500)

	const createQueryString = useCallback(
		(name: string, value: string) => {
			const params = new URLSearchParams(searchParams)
			params.set(name, value)

			return params.toString()
		},
		[searchParams]
	)

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => setQuery(event.target.value)

	useEffect(() => {
		if (!query) return router.push(pathname)

		router.push(pathname + '?' + createQueryString('q', query))
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [debouncedQuery])

	return (
		<div className='relative'>
			<SearchIcon className='pointer-events-none absolute left-4 top-1/2 z-10 h-4 w-4 -translate-y-1/2 select-none text-muted-foreground' />
			<Input
				placeholder='Wyszukaj kierunki'
				className='rounded-full bg-secondary py-4 pl-12 pr-6'
				value={query}
				onChange={handleChange}
			/>
		</div>
	)
}
