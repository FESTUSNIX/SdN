'use client'

import { useTransitionLoading } from '@/app/(main)/search/context/TransitionLoadingContext'
import { MultiSelect } from '@/app/components/MultiSelect'
import { H3 } from '@/app/components/ui/Typography'
import { useDebounce } from '@/app/hooks/useDebounce'
import { City } from '@prisma/client'
import { X } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState, useTransition } from 'react'

type Props = {
	cities: Pick<City, 'id' | 'name'>[]
}

const CityFilter = ({ cities }: Props) => {
	const router = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()!
	const [isPending, startTransition] = useTransition()
	const [selectedCities, setSelectedCities] = useState<string[] | null>([])
	const debouncedSelectedCities = useDebounce(selectedCities, 100)

	const { startLoading, stopLoading } = useTransitionLoading()

	const cityOptions: {
		value: string
		label: string
	}[] = cities.map(c => {
		return { label: c.name, value: c.id.toString() }
	})

	const createQueryString = useCallback(
		(name: string, value: string) => {
			const params = new URLSearchParams(searchParams)

			if (value === null || !value) {
				params.delete(name)
			} else {
				params.set(name, String(value))
			}

			return params.toString()
		},
		[searchParams]
	)

	useEffect(() => {
		const params = new URLSearchParams(searchParams)
		const citiesParams = params.get('cities')

		const citiesOptions = citiesParams
			?.split('.')
			.map(c => cityOptions.find(o => o.value === c))
			.filter(i => i !== undefined)

		setSelectedCities(citiesOptions?.map(c => c?.value!) ?? [])
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchParams])

	useEffect(() => {
		if (!debouncedSelectedCities) return

		startTransition(() => {
			router.push(`${pathname}?${createQueryString('cities', debouncedSelectedCities.join('.'))}`, {
				scroll: false
			})
		})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [debouncedSelectedCities])

	useEffect(() => {
		isPending ? startLoading() : stopLoading()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isPending])

	return (
		<div>
			<div className='mb-2'>
				<H3 size='sm' className='mb-1'>
					Miasto
				</H3>

				{selectedCities && selectedCities.length > 0 && (
					<button
						onClick={() => {
							setSelectedCities([])
						}}
						className='flex items-center gap-1 text-muted-foreground hover:underline'>
						<X className='h-3 w-3' />
						<span className='text-xs'>Odznacz wszystko</span>
					</button>
				)}
			</div>

			<MultiSelect
				options={cityOptions}
				selected={selectedCities}
				setSelected={setSelectedCities}
				placeholder='Wybierz miasta'
			/>
		</div>
	)
}

export default CityFilter
