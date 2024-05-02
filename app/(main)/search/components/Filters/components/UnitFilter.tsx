'use client'

import { useTransitionLoading } from '@/app/(main)/search/context/TransitionLoadingContext'
import { MultiSelect } from '@/app/components/MultiSelect'
import { H3 } from '@/app/components/ui/Typography'
import { useDebounce } from '@/app/hooks/useDebounce'
import { Unit } from '@prisma/client'
import { X } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState, useTransition } from 'react'

type Props = {
	units: Pick<Unit, 'id' | 'name'>[]
}

const UnitFilter = ({ units }: Props) => {
	const router = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()!
	const [isPending, startTransition] = useTransition()
	const [selectedUnits, setSelectedUnits] = useState<string[] | null>([])
	const debouncedSelectedUnits = useDebounce(selectedUnits, 100)

	const { startLoading, stopLoading } = useTransitionLoading()

	const unitOptions: {
		value: string
		label: string
	}[] = units.map(u => {
		return { label: u.name, value: u.id.toString() }
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
		const unitsParams = params.get('units')

		const unitsOptions = unitsParams
			?.split('.')
			.map(c => unitOptions.find(o => o.value === c))
			.filter(i => i !== undefined)

		setSelectedUnits(unitsOptions?.map(c => c?.value!) ?? [])
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchParams])

	useEffect(() => {
		if (!debouncedSelectedUnits) return

		startTransition(() => {
			router.push(`${pathname}?${createQueryString('units', debouncedSelectedUnits.join('.'))}`, {
				scroll: false
			})
		})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [debouncedSelectedUnits])

	useEffect(() => {
		isPending ? startLoading() : stopLoading()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isPending])

	return (
		<div>
			<div className='mb-2'>
				<H3 size='sm' className='mb-1'>
					Uczelnie
				</H3>

				{selectedUnits && selectedUnits.length > 0 && (
					<button
						onClick={() => {
							setSelectedUnits([])
						}}
						className='flex items-center gap-1 text-muted-foreground hover:underline'>
						<X className='h-3 w-3' />
						<span className='text-xs'>Odznacz wszystko</span>
					</button>
				)}
			</div>

			<MultiSelect
				options={unitOptions}
				selected={selectedUnits}
				setSelected={setSelectedUnits}
				placeholder='Wybierz uczelnie'
			/>
		</div>
	)
}

export default UnitFilter
