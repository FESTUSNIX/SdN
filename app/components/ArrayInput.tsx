'use client'

import { cn } from '@/lib/utils'
import { PlusIcon, X } from 'lucide-react'
import { KeyboardEvent, forwardRef, useCallback, useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { InputProps } from './ui/input'

type ArrayInputProps = {
	values: string[]
	setValues: (value: string[]) => void
	onChange?: (value: string[]) => void
	maxItemLength?: number
	maxLength?: number
	onMaxItemLengthError?: (value: string) => void
	onMaxLengthError?: (value: string) => void
	disabled?: boolean
	placeholder?: string
	clearErrors?: () => void
	onBlur?: InputProps['onBlur']
}

export const ArrayInput = forwardRef<HTMLInputElement, ArrayInputProps>(
	(
		{
			disabled,
			values,
			setValues,
			onChange,
			maxLength,
			maxItemLength,
			onMaxItemLengthError,
			onMaxLengthError,
			placeholder = 'Dodaj',
			onBlur,
			clearErrors
		},
		ref
	) => {
		const [query, setQuery] = useState('')

		useEffect(() => {
			if (onChange) onChange(values?.length ? values : [])
		}, [onChange, values])

		const handleAdd = useCallback(
			(value: string) => {
				clearErrors?.()

				if (values?.includes(value)) return
				if (maxItemLength && value.length > maxItemLength) return onMaxItemLengthError?.(value)
				if (maxLength && values?.length >= maxLength) return onMaxLengthError?.(value)

				setValues([...(values ?? []), value])
				setQuery('')
			},
			[setValues, values, maxItemLength, maxLength, onMaxItemLengthError, onMaxLengthError, clearErrors]
		)

		const handleRemove = useCallback(
			(value: string) => {
				setValues(values?.filter(item => item !== value) ?? [])
			},
			[setValues, values]
		)

		const handleKeyDown = useCallback(
			(event: KeyboardEvent<HTMLDivElement>) => {
				if (event.key === 'Enter' && query) {
					event.preventDefault()
					event.stopPropagation()

					handleAdd(query)
				}

				if ((event.key === 'Backspace' || event.key === 'Delete') && !query) {
					setValues(values?.slice(0, -1) ?? [])
				}
			},
			// eslint-disable-next-line react-hooks/exhaustive-deps
			[setValues, values, query]
		)

		return (
			<div className='group relative block cursor-text rounded-md border border-input px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2'>
				<div className='relative flex grow flex-wrap gap-1 pr-4'>
					{values?.map((value, i) => {
						return (
							<Badge key={`${value}-${i}`} variant='secondary' className='rounded hover:bg-secondary'>
								{value}
								<Button
									type='button'
									aria-label='Usuń opcję'
									size='sm'
									className='ml-2 h-auto bg-transparent p-0 text-primary hover:bg-transparent hover:text-destructive'
									onKeyDown={e => {
										if (e.key === 'Enter') {
											e.preventDefault()
											e.stopPropagation()
											handleRemove(value)
										}
									}}
									onMouseDown={e => {
										e.preventDefault()
										e.stopPropagation()
									}}
									onClick={() => handleRemove(value)}>
									<X className='h-3 w-3' aria-hidden='true' />
								</Button>
							</Badge>
						)
					})}
					<input
						ref={ref}
						placeholder={placeholder}
						className={cn(
							'flex-1 bg-transparent px-1 py-0.5 outline-none placeholder:text-muted-foreground',
							disabled && 'opacity-50'
						)}
						value={query}
						disabled={disabled}
						onChange={e => setQuery(e.target.value)}
						onKeyDown={handleKeyDown}
						onBlur={onBlur}
					/>

					<button
						type='button'
						onClick={() => {
							handleAdd(query)
						}}
						className='absolute right-0 top-[13px] flex size-5 -translate-y-1/2 items-center justify-center rounded-full border bg-secondary p-0.5'>
						<PlusIcon className='size-4' />
					</button>
				</div>
			</div>
		)
	}
)

ArrayInput.displayName = 'ArrayInput'
