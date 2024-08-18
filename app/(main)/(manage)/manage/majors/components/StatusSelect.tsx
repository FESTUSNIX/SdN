'use client'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select'
import { useDebounce } from '@/app/hooks/useDebounce'
import { LucideProps } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState, useTransition } from 'react'

const options: {
	value: string
	label: string
	Icon?: (props: LucideProps) => JSX.Element
}[] = [
	{
		value: 'ALL',
		label: 'Wszystkie'
	},
	{
		value: 'PUBLISHED',
		label: 'Opublikowane'
	},
	{
		value: 'DRAFT',
		label: 'Wersje robocze'
	}
]

const StatusSelect = () => {
	const defaultValue = 'ALL'

	const router = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()!
	const [isPending, startTransition] = useTransition()
	const [status, setStatus] = useState(defaultValue)
	const debouncedStatus = useDebounce(status, 50)

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
		const statusParam = params.get('publication_status') ?? ''

		if (!statusParam) return
		setStatus(statusParam)
	}, [searchParams])

	useEffect(() => {
		startTransition(() => {
			router.push(`${pathname}?${createQueryString('publication_status', debouncedStatus)}`, {
				scroll: false
			})
		})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [debouncedStatus])

	return (
		<div className='h-full shrink-0'>
			<Select onValueChange={setStatus} value={status} defaultValue={options[0].value}>
				<SelectTrigger className='h-full gap-2 rounded-full'>
					<SelectValue />
				</SelectTrigger>
				<SelectContent>
					{options.map(item => (
						<SelectItem key={item.value} value={item.value}>
							{item.Icon && <item.Icon className='mr-2 h-auto w-4 fill-muted-foreground' />}
							<span>{item.label}</span>
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	)
}

export default StatusSelect
