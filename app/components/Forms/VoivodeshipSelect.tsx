'use client'

import { getVoivodeships } from '@/app/_actions'
import { Combobox, ComboboxProps } from '@/app/components/ui/combobox'
import { Skeleton } from '@/app/components/ui/skeleton'
import { useQuery } from '@tanstack/react-query'

type Props = {} & Omit<ComboboxProps, 'options'>

export const VoivodeshipSelect = ({ ...props }: Props) => {
	const { data: voivodeships } = useQuery({
		queryKey: ['voivodeships'],
		queryFn: async () => {
			const res = await getVoivodeships()

			const options = res.map(voivodeship => ({
				value: voivodeship.id.toString(),
				label: voivodeship.name
			}))

			return options
		}
	})

	return (
		<div>
			{voivodeships && voivodeships?.length > 0 ? (
				<Combobox
					{...props}
					options={voivodeships}
					value={(props.value || '').toString()}
					setValue={value => props.setValue(Number(value))}
				/>
			) : (
				<Skeleton className='h-10' />
			)}
		</div>
	)
}
