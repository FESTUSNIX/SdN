'use client'

import { useTransitionLoading } from '@/app/(main)/search/context/TransitionLoadingContext'
import { Switch } from '@/app/components/ui/Switch'
import { Muted } from '@/app/components/ui/Typography'
import { useDebounce } from '@/app/hooks/useDebounce'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState, useTransition } from 'react'

type Props = {
	paramName: string
	label: string
	description?: string
}

const SwitchFilter = ({ paramName, label, description }: Props) => {
	const router = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()!
	const [isPending, startTransition] = useTransition()
	const [isChecked, setIsChecked] = useState(false)
	const debouncedIsChecked = useDebounce(isChecked, 100)

	const { startLoading, stopLoading } = useTransitionLoading()

	const createQueryString = useCallback(
		(name: string, value: boolean) => {
			const newSearchParams = new URLSearchParams(searchParams?.toString())

			if (value === null || value === false) {
				newSearchParams.delete(name)
			} else {
				newSearchParams.set(name, String(value))
			}

			return newSearchParams.toString()
		},
		[searchParams]
	)

	useEffect(() => {
		const params = new URLSearchParams(searchParams)
		const isCheckedParam = params.get(paramName) ?? ''

		isCheckedParam && setIsChecked(isCheckedParam === 'true')
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchParams])

	useEffect(() => {
		startTransition(() => {
			router.push(`${pathname}?${createQueryString(paramName, isChecked)}`, {
				scroll: false
			})
		})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [debouncedIsChecked])

	useEffect(() => {
		isPending ? startLoading() : stopLoading()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isPending])

	return (
		<div>
			<label className='flex flex-row items-center justify-between rounded-lg border p-4'>
				<div className='pr-4'>
					<div className=''>{label}</div>
					{description && <Muted>{description}</Muted>}
				</div>

				<Switch checked={isChecked} onCheckedChange={setIsChecked} />
			</label>
		</div>
	)
}

export default SwitchFilter
