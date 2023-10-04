'use client'

import { Input } from '@/app/components/ui/Input'
import { useDebounce } from '@/app/hooks/useDebounce'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { ChangeEvent, useCallback, useEffect, useState } from 'react'

type Props = {
	paramName: string
	label: string
}

const PriceRangeInput = ({ label, paramName }: Props) => {
	const router = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()!

	const [value, setValue] = useState('')
	const debouncedValue = useDebounce(value, 500)

	const createQueryString = useCallback(
		(name: string, value: string) => {
			const params = new URLSearchParams(searchParams)
			params.set(name, value)

			return params.toString()
		},
		[searchParams]
	)

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => setValue(event.target.value)

	useEffect(() => {
		const params = new URLSearchParams(window.location.search)
		const searchQuery = params.get(paramName) ?? ''
		setValue(searchQuery)
	}, [])

	useEffect(() => {
		router.push(pathname + '?' + createQueryString(paramName, value))
	}, [debouncedValue])

	return (
		<div className='relative'>
			<Input placeholder={label} value={value} onChange={handleChange} className='pr-7' />
			<span className='pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground'>zł</span>
		</div>
	)
}

export default PriceRangeInput
