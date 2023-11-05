'use client'

import { Icons } from '@/app/components/Icons'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/Select'
import { useDebounce } from '@/app/hooks/useDebounce'
import { LucideIcon } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState, useTransition } from 'react'
import { useTransitionLoading } from '../../context/TransitionLoadingContext'

const options: {
	value: string
	label: string
	Icon: LucideIcon
}[] = [
	{
		value: 'list',
		label: 'Lista',
		Icon: Icons.list
	},
	{
		value: 'grid',
		label: 'Karty',
		Icon: Icons.cards
	}
]

const ListTypeSelect = () => {
	const defaultValue = 'list'

	const router = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()!
	const [isPending, startTransition] = useTransition()
	const [listType, setListType] = useState(defaultValue)
	const debouncedListType = useDebounce(listType, 0)

	const { startLoading, stopLoading } = useTransitionLoading()

	const createQueryString = useCallback(
		(name: string, value: string) => {
			const params = new URLSearchParams(searchParams)

			if (value === null || !value) {
				params.delete(name)
			} else {
				params.set(name, value)
			}

			return params.toString()
		},
		[searchParams]
	)

	useEffect(() => {
		const params = new URLSearchParams(searchParams)
		const listTypeParam = params.get('list_type')

		if (!listTypeParam) return

		setListType(listTypeParam === 'list' || listTypeParam === 'grid' ? listTypeParam : defaultValue)
	}, [searchParams])

	useEffect(() => {
		startTransition(() => {
			router.push(`${pathname}?${createQueryString('list_type', debouncedListType)}`, {
				scroll: false
			})
		})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [debouncedListType])

	useEffect(() => {
		isPending ? startLoading() : stopLoading()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isPending])

	return (
		<div className='shrink-0'>
			<Select onValueChange={setListType} value={listType} defaultValue={options[0].value}>
				<SelectTrigger className='h-9 rounded-full py-2'>
					<SelectValue />
				</SelectTrigger>
				<SelectContent>
					{options.map(item => (
						<SelectItem key={item.value} value={item.value} className='py-2.5'>
							<item.Icon className='mr-2 h-auto w-4 fill-muted-foreground' />
							<span className='sr-only'>{item.label}</span>
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	)
}

export default ListTypeSelect
