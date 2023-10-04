'use client'

import { H3 } from '@/app/components/ui/Typography'
import PriceRangeInput from '../PriceRangeInput'
import { Slider } from '@/app/components/ui/slider'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState, useTransition } from 'react'
import { useDebounce } from '@/app/hooks/useDebounce'
import { Input } from '@/app/components/ui/Input'

type Props = {}

const PriceRange = (props: Props) => {
	const router = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()!
	const [isPending, startTransition] = useTransition()
	const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000])
	const debouncedPrice = useDebounce(priceRange, 500)

	const createQueryString = useCallback(
		(name: string, value: string) => {
			const params = new URLSearchParams(searchParams)
			params.set(name, value)

			return params.toString()
		},
		[searchParams]
	)

	useEffect(() => {
		const params = new URLSearchParams(searchParams)
		const searchQuery = params.get('price_range') ?? ''

		const [minPrice, maxPrice] = searchQuery.split('-') ?? []

		setPriceRange([Number(minPrice), Number(maxPrice)])
	}, [])

	useEffect(() => {
		const [min, max] = debouncedPrice
		startTransition(() => {
			router.push(`${pathname}?${createQueryString('price_range', `${min}-${max}`)}`, {
				scroll: false
			})
		})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [debouncedPrice])

	return (
		<div>
			<H3 size='sm' className='mb-3'>
				Cena
			</H3>

			<div className='flex items-center'>
				<div className='relative'>
					<Input
						type='number'
						inputMode='numeric'
						min={0}
						max={priceRange[1]}
						value={priceRange[0]}
						onChange={e => {
							const value = Number(e.target.value)
							setPriceRange([value, priceRange[1]])
						}}
						placeholder='Od'
						className='pr-7'
					/>
					<span className='pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground'>
						zł
					</span>
				</div>
				<span className='mx-2 h-px w-6 bg-border' />
				<div className='relative'>
					<Input
						type='number'
						inputMode='numeric'
						min={priceRange[0]}
						max={10000}
						value={priceRange[1]}
						onChange={e => {
							const value = Number(e.target.value)
							setPriceRange([priceRange[0], value])
						}}
						placeholder='Do'
						className='pr-7'
					/>
					<span className='pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground'>
						zł
					</span>
				</div>
			</div>

			<div className='mt-6'>
				<Slider
					variant='range'
					defaultValue={[0, 10000]}
					max={10000}
					step={1}
					value={priceRange}
					onValueChange={(value: typeof priceRange) => setPriceRange(value)}
				/>
			</div>
		</div>
	)
}

export default PriceRange
