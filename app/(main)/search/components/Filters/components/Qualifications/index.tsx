'use client'

import { H3 } from '@/app/components/ui/Typography'
import { Checkbox } from '@/app/components/ui/checkbox'
import { useDebounce } from '@/app/hooks/useDebounce'
import { CheckedState } from '@radix-ui/react-checkbox'
import { ArrowDown, ChevronDown, X } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState, useTransition } from 'react'
import { Qualification } from '@prisma/client'
import { Input } from '@/app/components/ui/input'
import { useTransitionLoading } from '@/app/(main)/search/context/TransitionLoadingContext'

type Props = {
	qualifications: Pick<Qualification, 'id' | 'name'>[]
}

const Qualifications = ({ qualifications }: Props) => {
	const router = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()!
	const [isPending, startTransition] = useTransition()
	const [selectedQualifications, setSelectedQualifications] = useState<number[]>([])
	const debouncedSelectedQualifications = useDebounce(selectedQualifications, 100)

	const { startLoading, stopLoading } = useTransitionLoading()

	const createQueryString = useCallback(
		(params: Record<string, string | number | null>) => {
			const newSearchParams = new URLSearchParams(searchParams?.toString())

			for (const [key, value] of Object.entries(params)) {
				if (value === null) {
					newSearchParams.delete(key)
				} else {
					newSearchParams.set(key, String(value))
				}
			}

			return newSearchParams.toString()
		},
		[searchParams]
	)

	const handleChange = (checked: CheckedState, value: number) =>
		checked
			? setSelectedQualifications(prevValues => [...prevValues, value])
			: setSelectedQualifications(prevValues => prevValues?.filter(prevVal => prevVal !== value))

	useEffect(() => {
		const params = new URLSearchParams(searchParams)
		const qualificationParams = params.getAll('qualifications') ?? ''

		setSelectedQualifications(qualificationParams.map(q => Number(q)))
	}, [searchParams])

	useEffect(() => {
		startTransition(() => {
			router.push(
				`${pathname}?${createQueryString({
					qualifications: selectedQualifications?.length ? selectedQualifications.map(q => q).join('.') : null
				})}`,
				{
					scroll: false
				}
			)
		})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [debouncedSelectedQualifications])

	useEffect(() => {
		isPending ? startLoading() : stopLoading()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isPending])

	const [search, setSearch] = useState('')
	const [showCount, setShowCount] = useState(10)

	return (
		<div>
			<div className='mb-2'>
				<H3 size='sm' className='mb-1'>
					Kwalifikacje
				</H3>

				{selectedQualifications.length > 0 && (
					<button
						onClick={() => {
							setSelectedQualifications([])
						}}
						className='flex items-center gap-1 text-muted-foreground hover:underline'>
						<X className='h-3 w-3' />
						<span className='text-xs'>Odznacz wszystko</span>
					</button>
				)}
			</div>

			<div className='mb-4 mt-4'>
				<Input
					placeholder='Wyszukaj kwalifikacje'
					value={search}
					onChange={e => setSearch(e.target.value)}
					className='rounded-full'
				/>
			</div>

			<div>
				{qualifications
					.sort((a, b) => (selectedQualifications.includes(a.id) ? -1 : selectedQualifications.includes(b.id) ? 1 : 0))
					.filter(q => q.name.toLowerCase().includes(search.toLowerCase()))
					.splice(0, showCount)
					.map(qualification => (
						<label key={qualification.id.toString()} className='flex cursor-pointer items-center gap-3'>
							<Checkbox
								checked={selectedQualifications?.includes(qualification.id)}
								onCheckedChange={checked => handleChange(checked, qualification.id)}
							/>
							<span className='text-sm'>{qualification.name}</span>
						</label>
					))}
			</div>

			{showCount < qualifications.length ? (
				<button
					onClick={() => {
						setShowCount(prevCount => prevCount + 15)
					}}
					className='mt-2 text-sm underline'>
					Pokaż więcej
				</button>
			) : (
				<button
					onClick={() => {
						setShowCount(10)
					}}
					className='mt-2 text-sm underline'>
					Pokaż mniej
				</button>
			)}
		</div>
	)
}

export default Qualifications
