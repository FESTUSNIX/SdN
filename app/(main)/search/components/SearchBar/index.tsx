'use client'

import { Input } from '@/app/components/ui/Input'
import { useDebounce } from '@/app/hooks/useDebounce'
import { SearchIcon } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { ChangeEvent, useCallback, useEffect, useState } from 'react'

const SearchBar = () => {
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
		const params = new URLSearchParams(searchParams)
		const searchQuery = params.get('q') ?? ''
		setQuery(searchQuery)
	}, [])

	useEffect(() => {
		router.push(pathname + '?' + createQueryString('q', query))
	}, [debouncedQuery])

	return (
		<div className='relative grow'>
			<SearchIcon className='pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 select-none text-muted-foreground' />
			<Input
				placeholder='Szukaj wśród 2568 ofert'
				className='h-auto rounded-full py-4 pl-12 pr-6'
				value={query}
				onChange={handleChange}
			/>
		</div>
	)
}

export default SearchBar
