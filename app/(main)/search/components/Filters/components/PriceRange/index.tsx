'use client'

import { Input } from '@/app/components/ui/Input'
import { H3 } from '@/app/components/ui/Typography'
import { Slider } from '@/app/components/ui/slider'
import { useDebounce } from '@/app/hooks/useDebounce'
import { cn } from '@/lib/utils/utils'
import { X } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState, useTransition } from 'react'

const PriceRange = () => {
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

		const [minPrice, maxPrice] = searchQuery.split('-')

		minPrice && maxPrice && setPriceRange([Number(minPrice), Number(maxPrice)])

		// eslint-disable-next-line react-hooks/exhaustive-deps
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
			<div className='mb-2'>
				<H3 size='sm' className='mb-1'>
					Cena
				</H3>
				{(priceRange[0] !== 0 || priceRange[1] !== 10000) && (
					<button
						onClick={() => {
							setPriceRange([0, 10000])
						}}
						className='flex items-center gap-1 text-muted-foreground hover:underline'>
						<X className='h-3 w-3' />
						<span className='text-xs'>Zresetuj wartości</span>
					</button>
				)}
			</div>

			<div className='flex items-center'>
				<div className='relative basis-1/2'>
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
						className='rounded-full pr-7'
					/>
					<span className='pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground'>
						zł
					</span>
				</div>
				<span className='mx-2 h-px w-4 bg-border' />
				<div className='relative basis-1/2'>
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
						className={cn('rounded-full pr-7', priceRange[1] >= 10000 && 'pl-6')}
					/>
					<span className='pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground'>
						zł
					</span>

					{priceRange[1] >= 10000 && (
						<span className='pointer-events-none absolute left-3 top-1/2 -translate-y-1/2'>+</span>
					)}
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
