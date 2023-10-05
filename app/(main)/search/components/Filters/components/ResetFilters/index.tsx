'use client'

import { X } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

type Props = {}

const ResetFilters = (props: Props) => {
	const router = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()!

	const resetParams = () => {
		const params = new URLSearchParams(searchParams)

		const searchQuery = params.get('q')

		router.push(`${pathname}${searchQuery ? `?q=${searchQuery}` : ''}`, {
			scroll: false
		})
	}

	return (
		<button onClick={() => resetParams()} className='flex items-center gap-1 text-muted-foreground hover:underline'>
			<X className='h-3 w-3' />
			<span className='text-xs'>Resetuj wszystkie</span>
		</button>
	)
}

export default ResetFilters
