'use client'

import { MajorLevel } from '@prisma/client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useCallback, useEffect, useTransition } from 'react'
import { usePrevious } from '@/app/hooks/usePrevious'
import { deepEqual } from '@/lib/utils/utils'

type Props = {
	params: Partial<{
		canPayInInstallments: boolean
		cities: number[]
		isOnline: boolean
		isRegulated: boolean
		majorLevel: MajorLevel[] | MajorLevel | undefined
		maxPrice: string
		minPrice: string
		orderBy: {
			[key: string]: string
		}
		qualifications: number[]
		searchQuery: string
		voivodeships: number[]
		units: number[]
	}> & {
		page: string
	}
}

export const SearchParamsChangeHandler = ({ params: _params }: Props) => {
	const router = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()

	const [isPending, startTransition] = useTransition()

	const { page, ...params } = _params
	const previousParams = usePrevious(_params)

	const createQueryString = useCallback(
		(params: Record<string, string | number | null>) => {
			const newSearchParams = new URLSearchParams(searchParams?.toString())

			for (const [key, value] of Object.entries(params)) {
				if (value === null) {
					newSearchParams.delete(key)
				} else {
					newSearchParams.set(key, String(value))
				}
			}

			return newSearchParams.toString()
		},
		[searchParams]
	)

	const resetPage = () => {
		startTransition(() => {
			router.push(`${pathname}?${createQueryString({ page: '1' })}`)
		})
	}

	useEffect(() => {
		if (!previousParams) return

		const { page, ...previousParamsWithoutPage } = previousParams
		console.log('SearchParamsChangeHandler props changed', previousParamsWithoutPage, params)

		if (!deepEqual(previousParamsWithoutPage, params)) {
			console.log('NOT EQUAL')

			if (page !== '1') {
				resetPage()
				console.log('RESET PAGE')
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [params])

	return <div>SearchParamsChangeHandler</div>
}
