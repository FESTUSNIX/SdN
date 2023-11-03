'use client'

import { X } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

type Props = {}

const ResetFilters = (props: Props) => {
	const router = useRouter()
	const pathname = usePathname()
	const readOnlySearchParams = useSearchParams()!

	const [show, setShow] = useState(false)

	const resetParams = () => {
		const params = new URLSearchParams(readOnlySearchParams)

		const searchQuery = params.get('q')
		const listType = params.get('list_type')

		router.push(
			`${pathname}${
				searchQuery || listType
					? `?${searchQuery ? `q=${searchQuery}` : ''}${listType ? `list_type=${listType}` : ''}`
					: ''
			}`,
			{
				scroll: false
			}
		)
	}

	useEffect(() => {
		const params = new URLSearchParams(readOnlySearchParams)

		for (const [key, value] of params.entries()) setShow(!['q', 'list_type'].includes(key))
	}, [readOnlySearchParams])

	if (!show) return null

	return (
		<button onClick={() => resetParams()} className='flex items-center gap-1 text-muted-foreground hover:underline'>
			<X className='h-3 w-3' />
			<span className='text-xs'>Resetuj wszystkie</span>
		</button>
	)
}

export default ResetFilters
