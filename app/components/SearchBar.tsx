'use client'

import { Input } from '@/app/components/ui/input'
import { useDebounce } from '@/app/hooks/useDebounce'
import { cn } from '@/lib/utils'
import { SearchIcon } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'

type Props = {
	debounceTime?: number
	placeholder?: string
	param?: string
	className?: string
}

const SearchBar = ({ placeholder, param, className, debounceTime = 500 }: Props) => {
	const router = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()!

	const [query, setQuery] = useState('')
	const debouncedQuery = useDebounce(query, debounceTime)

	const paramName = param ?? 'q'

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

	const pushQuery = useCallback(
		(query: string) => {
			const queryString = createQueryString({ [paramName]: query })

			router.push(pathname + '?' + queryString, { scroll: false })
		},
		[createQueryString, paramName, pathname, router]
	)

	useEffect(() => {
		const params = new URLSearchParams(searchParams)
		const searchQuery = params.get(paramName) ?? ''

		if (query === searchQuery) return

		setQuery(searchQuery)

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchParams])

	useEffect(() => {
		pushQuery(debouncedQuery)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [debouncedQuery])

	return (
		<div className={cn('relative grow', className)}>
			<SearchIcon className='pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 select-none text-muted-foreground' />
			<Input
				placeholder={placeholder ?? `Szukaj`}
				className='h-auto rounded-full py-4 pl-12 pr-6'
				value={query}
				onChange={e => setQuery(e.target.value.trim())}
			/>
		</div>
	)
}

export default SearchBar
