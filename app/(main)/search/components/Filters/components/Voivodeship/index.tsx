'use client'

import { useTransitionLoading } from '@/app/(main)/search/context/TransitionLoadingContext'
import { MultiSelect } from '@/app/components/MultiSelect'
import { H3 } from '@/app/components/ui/Typography'
import { useDebounce } from '@/app/hooks/useDebounce'
import { Voivodeship } from '@prisma/client'
import { X } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState, useTransition } from 'react'

type Props = {
	voivodeships: Pick<Voivodeship, 'id' | 'name'>[]
}

const VoivodeshipFilter = ({ voivodeships }: Props) => {
	const router = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()!
	const [isPending, startTransition] = useTransition()
	const [selectedVoivodeships, setSelectedVoivodeships] = useState<{ value: string; label: string }[] | null>([])
	const debouncedSelectedVoivodeships = useDebounce(selectedVoivodeships, 100)

	const { startLoading, stopLoading } = useTransitionLoading()

	const voivodeshipOptions: {
		value: string
		label: string
	}[] = voivodeships.map(v => {
		return { label: v.name, value: v.id.toString() }
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
		const voivodeshipsParams = params.get('voivodeship')

		const voivodeshipsOptions = voivodeshipsParams
			?.split('.')
			.map(v => voivodeshipOptions.find(o => o.value === v))
			.filter(i => i !== undefined)

		setSelectedVoivodeships(
			voivodeshipsOptions?.length ? (voivodeshipsOptions as { value: string; label: string }[]) : null
		)
	}, [searchParams])

	useEffect(() => {
		if (!debouncedSelectedVoivodeships) return

		startTransition(() => {
			router.push(
				`${pathname}?${createQueryString('voivodeship', debouncedSelectedVoivodeships?.map(q => q.value).join('.'))}`,
				{
					scroll: false
				}
			)
		})
	}, [debouncedSelectedVoivodeships])

	useEffect(() => {
		isPending ? startLoading() : stopLoading()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isPending])

	return (
		<div>
			<div className='mb-2'>
				<H3 size='sm' className='mb-1'>
					Województwo
				</H3>

				{selectedVoivodeships && selectedVoivodeships.length > 0 && (
					<button
						onClick={() => {
							setSelectedVoivodeships([])
						}}
						className='flex items-center gap-1 text-muted-foreground hover:underline'>
						<X className='h-3 w-3' />
						<span className='text-xs'>Odznacz wszystko</span>
					</button>
				)}
			</div>

			<MultiSelect
				options={voivodeshipOptions}
				selected={selectedVoivodeships}
				setSelected={setSelectedVoivodeships}
				placeholder='Wybierz województwa'
			/>
		</div>
	)
}

export default VoivodeshipFilter
