'use client'

import { useTransitionLoading } from '@/app/(main)/search/context/TransitionLoadingContext'
import { H3 } from '@/app/components/ui/Typography'
import { Checkbox } from '@/app/components/ui/checkbox'
import { useDebounce } from '@/app/hooks/useDebounce'
import { CheckedState } from '@radix-ui/react-checkbox'
import { X } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState, useTransition } from 'react'

type Props = {
	items: {
		value: string | boolean
		label: string
	}[]
	paramName: string
	label?: string
	clearAllBtn?: boolean
}

const CheckboxGroup = ({ paramName, items, label, clearAllBtn = true }: Props) => {
	const router = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()!
	const [isPending, startTransition] = useTransition()

	const { startLoading, stopLoading } = useTransitionLoading()

	const [values, setValues] = useState<(string | boolean)[]>([])
	const debouncedQuery = useDebounce(values, 100)

	const createQueryString = useCallback(
		(name: string, values: (string | boolean)[]) => {
			const params = new URLSearchParams(searchParams)

			params.delete(paramName)

			values.map(v => {
				params.append(name, v.toString())
			})

			return params.toString()
		},
		[searchParams]
	)

	const handleChange = (checked: CheckedState, value: string | boolean) =>
		checked
			? setValues(prevValues => [...prevValues, value])
			: setValues(prevValues => prevValues?.filter(prevVal => prevVal !== value))

	useEffect(() => {
		const params = new URLSearchParams(searchParams)
		const searchQuery = params.getAll(paramName) ?? ''
		setValues(searchQuery)
	}, [searchParams])

	useEffect(() => {
		startTransition(() => {
			router.push(pathname + '?' + createQueryString(paramName, values))
		})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [debouncedQuery])

	useEffect(() => {
		isPending ? startLoading() : stopLoading()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isPending])

	return (
		<div>
			<div className='mb-2'>
				{label && (
					<H3 size='sm' className='mb-1'>
						{label}
					</H3>
				)}

				{clearAllBtn && values.length > 0 && (
					<button
						onClick={() => {
							setValues([])
						}}
						className='flex items-center gap-1 text-muted-foreground hover:underline'>
						<X className='h-3 w-3' />
						<span className='text-xs'>Odznacz wszystko</span>
					</button>
				)}
			</div>

			<div>
				{items.map(item => (
					<label key={item.value.toString()} className='flex cursor-pointer items-center gap-3'>
						<Checkbox
							checked={values?.includes(item.value)}
							onCheckedChange={checked => handleChange(checked, item.value)}
						/>
						<span className='text-sm'>{item.label}</span>
					</label>
				))}
			</div>
		</div>
	)
}

export default CheckboxGroup
