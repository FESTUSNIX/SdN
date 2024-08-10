'use client'

import { useDebounce } from '@/app/hooks/useDebounce'
import { cn } from '@/lib/utils'
import React, { useEffect } from 'react'
import { useTransitionLoading } from '../../(main)/search/context/TransitionLoadingContext'
import MajorCardSkeleton from './CardSkeleton'

type Props = {
	children: React.ReactNode
	listType: 'grid' | 'list'
}

export const ResultsLoading = ({ children, listType }: Props) => {
	const { isLoading, stopLoading } = useTransitionLoading()

	const debouncedIsLoading = useDebounce(isLoading, 50)

	useEffect(() => {
		let timeoutId: NodeJS.Timeout

		if (isLoading) {
			timeoutId = setTimeout(() => {
				if (isLoading) {
					stopLoading()
				}
			}, 10000)
		}

		return () => {
			if (timeoutId) {
				clearTimeout(timeoutId)
			}
		}
	}, [isLoading, stopLoading])

	if (debouncedIsLoading)
		return (
			<div
				className={cn(
					'grid gap-x-1 gap-y-2 @container',
					listType === 'grid' && 'grid-cols-3',
					listType === 'list' && 'grid-cols-1'
				)}>
				{Array(10)
					.fill(0)
					.map((_, i) => (
						<MajorCardSkeleton key={i} type={listType} />
					))}
			</div>
		)

	return children
}
