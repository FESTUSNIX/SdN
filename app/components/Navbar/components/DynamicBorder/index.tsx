'use client'

import { useScrollPosition } from '@/app/hooks/useScrollPosition'
import { cn } from '@/lib/utils/utils'
import React from 'react'

export const DynamicBorder = () => {
	const { y } = useScrollPosition()

	return (
		<div
			className={cn(
				'pointer-events-none absolute inset-0 -z-10 border-b transition-colors duration-300',
				y > 10 ? 'border-border' : 'border-transparent'
			)}></div>
	)
}
