'use client'

import { Combobox, ComboboxProps } from '@/app/components/ui/Combobox'
import { Skeleton } from '@/app/components/ui/skeleton'
import { getUnitSelectOptions } from '@/lib/actions'
import { useQuery } from '@tanstack/react-query'

type Props = {} & Omit<ComboboxProps, 'options'>

export const UnitSelect = ({ ...props }: Props) => {
	const { data: units } = useQuery({
		queryKey: ['unitSelectOptions'],
		queryFn: async () => {
			const res = await getUnitSelectOptions()
			return res
		}
	})

	return (
		<div>{units && units?.length > 0 ? <Combobox {...props} options={units} /> : <Skeleton className='h-10' />}</div>
	)
}
