'use client'

// Thanks to https://github.com/sadmann7 for the component

import { Button } from '@/app/components/ui/Button'
import { cn } from '@/lib/utils'
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useMemo, useTransition } from 'react'
import { useTransitionLoading } from '../../context/TransitionLoadingContext'

interface PaginationProps extends React.HTMLAttributes<HTMLDivElement> {
	pageCount: number
	page?: string
	per_page?: string
	siblingCount?: number
}

export function Pagination({ pageCount, page, per_page, siblingCount = -1, className, ...props }: PaginationProps) {
	const router = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()
	const [isPending, startTransition] = useTransition()

	const { startLoading, stopLoading } = useTransitionLoading()

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

	// Memoize pagination range to avoid unnecessary re-renders
	const paginationRange = useMemo(() => {
		const delta = siblingCount + 2

		const range = []
		for (let i = Math.max(2, Number(page) - delta); i <= Math.min(pageCount - 1, Number(page) + delta); i++) {
			range.push(i)
		}

		if (Number(page) - delta > 2) {
			range.unshift('...')
		}
		if (Number(page) + delta < pageCount - 1) {
			range.push('...')
		}

		range.unshift(1)
		if (pageCount !== 1) {
			range.push(pageCount)
		}

		return range
	}, [pageCount, page, siblingCount])

	useEffect(() => {
		isPending ? startLoading() : stopLoading()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isPending])

	return (
		<div className={cn('flex flex-wrap items-center justify-center gap-2', className)} {...props}>
			<Button
				aria-label='Pierwsza strona'
				variant='outline'
				size='icon'
				className='hidden h-8 w-8 lg:flex'
				onClick={() => {
					startTransition(() => {
						router.push(
							`${pathname}?${createQueryString({
								page: 1
							})}`
						)
					})
				}}
				disabled={Number(page) === 1 || isPending}>
				<ChevronsLeft className='h-4 w-4' aria-hidden='true' />
			</Button>
			<Button
				aria-label='Poprzednia strona'
				variant='outline'
				size='icon'
				className='h-8 w-8'
				onClick={() => {
					startTransition(() => {
						router.push(
							`${pathname}?${createQueryString({
								page: Number(page) - 1
							})}`
						)
					})
				}}
				disabled={Number(page) === 1 || isPending}>
				<ChevronLeft className='h-4 w-4' aria-hidden='true' />
			</Button>
			{paginationRange.map((pageNumber, i) =>
				pageNumber === '...' ? (
					<Button aria-label='Rozdzielacz stron' key={i} variant='outline' size='icon' className='h-8 w-8' disabled>
						...
					</Button>
				) : (
					<Button
						aria-label={`Strona ${pageNumber}`}
						key={i}
						variant={Number(page) === pageNumber ? 'default' : 'outline'}
						size='icon'
						className='h-8 w-8'
						onClick={() => {
							startTransition(() => {
								router.push(
									`${pathname}?${createQueryString({
										page: pageNumber
									})}`
								)
							})
						}}
						disabled={isPending}>
						{pageNumber}
					</Button>
				)
			)}
			<Button
				aria-label='Następna strona'
				variant='outline'
				size='icon'
				className='h-8 w-8'
				onClick={() => {
					startTransition(() => {
						router.push(
							`${pathname}?${createQueryString({
								page: Number(page) + 1
							})}`
						)
					})
				}}
				disabled={Number(page) === (pageCount ?? 10) || isPending}>
				<ChevronRight className='h-4 w-4' aria-hidden='true' />
			</Button>
			<Button
				aria-label='Ostatnia strona'
				variant='outline'
				size='icon'
				className='hidden h-8 w-8 lg:flex'
				onClick={() => {
					router.push(
						`${pathname}?${createQueryString({
							page: pageCount ?? 10
						})}`
					)
				}}
				disabled={Number(page) === (pageCount ?? 10) || isPending}>
				<ChevronsRight className='h-4 w-4' aria-hidden='true' />
			</Button>
		</div>
	)
}
