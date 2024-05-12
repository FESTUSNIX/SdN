'use client'

import { Input } from '@/app/components/ui/Input'
import { useDebounce } from '@/app/hooks/useDebounce'
import { cn } from '@/lib/utils/utils'
import { SearchIcon } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState, useTransition } from 'react'
import { useTransitionLoading } from '../context/TransitionLoadingContext'

type Props = {
	debounceTime?: number
	placeholder?: string
	param?: string
	className?: string
}

export const AdvancedSearchBar = ({ placeholder, param, className, debounceTime = 0 }: Props) => {
	const router = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()!

	const [isPending, startTransition] = useTransition()
	const { isLoading, startLoading, stopLoading } = useTransitionLoading()

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
			startTransition(() => {
				const queryString = createQueryString({ [paramName]: query })
				router.push(pathname + '?' + queryString, { scroll: false })
			})
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[createQueryString, paramName, pathname, router, isLoading]
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

	useEffect(() => {
		isPending ? startLoading() : stopLoading()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isPending])

	return (
		<div className={cn('relative grow', className)}>
			<SearchIcon className='pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 select-none text-muted-foreground' />
			<Input
				placeholder={placeholder ?? `Szukaj`}
				className='h-auto rounded-full py-4 pl-12 pr-6'
				value={query}
				onChange={e => setQuery(e.target.value)}
			/>
		</div>
	)
}
