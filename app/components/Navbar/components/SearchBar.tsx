'use client'

import { useDebounce } from '@/app/hooks/useDebounce'
import { SearchIcon } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ChangeEvent, useCallback, useEffect, useState } from 'react'

export const SearchBar = () => {
	const router = useRouter()
	const searchParams = useSearchParams()!

	const [query, setQuery] = useState('')
	const debouncedQuery = useDebounce(query, 250)

	const createQueryString = useCallback(
		(queries: { [key: string]: string | undefined }) => {
			const params = new URLSearchParams(searchParams)

			Object.entries(queries).map(([key, value]) => {
				if (!value) return params.delete(key)

				return params.set(key, value)
			})

			return params.toString()
		},
		[searchParams]
	)

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => setQuery(event.target.value)

	useEffect(() => {
		const params = new URLSearchParams(searchParams)
		const searchQuery = params.get('q') ?? ''

		if (debouncedQuery === searchQuery) return

		setQuery(searchQuery)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchParams])

	return (
		<label className='relative flex h-10 max-w-full cursor-text items-center overflow-hidden rounded-full border border-input bg-background'>
			<input
				placeholder='Wyszukaj kierunki'
				className='w-full grow bg-transparent px-4 py-2 placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50'
				value={query}
				onChange={handleChange}
			/>
			<button
				onClick={() => {
					if (!debouncedQuery) return router.push('/search')

					router.push('/search' + '?' + createQueryString({ q: debouncedQuery }), { scroll: false })
				}}
				className='z-10 m-1 ml-0 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary duration-300 hover:bg-primary/90 active:scale-90'>
				<SearchIcon className='pointer-events-none h-3.5 w-3.5 select-none stroke-[3] text-primary-foreground' />
				<span className='sr-only'>Szukaj</span>
			</button>
		</label>
	)
}
