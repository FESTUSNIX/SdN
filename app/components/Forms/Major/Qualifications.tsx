import { Qualification } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useEffect, useMemo, useState } from 'react'
import { Control, FieldPath, FieldValues, useController } from 'react-hook-form'
import { MultiSelect } from '../../MultiSelect'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../ui/Form'
import { Skeleton } from '../../ui/skeleton'

type Props<T extends FieldValues> = {
	accessorKey: FieldPath<T>
	control?: Control<T>
	label?: string
}

export const QualificationsField = <T extends FieldValues>({ control, accessorKey, label }: Props<T>) => {
	const { field, formState } = useController({ name: accessorKey, control: control })

	const { data: qualifications } = useQuery({
		queryKey: ['qualifications'],
		queryFn: async () => {
			const { data } = await axios.get<Qualification[]>('/api/qualifications')

			return data
		},
		cacheTime: 0
	})

	const qualificationsOptions = qualifications?.map(qualification => ({
		label: qualification.name,
		value: qualification.id.toString()
	}))

	const defaultQualifications = useMemo(
		() =>
			qualificationsOptions?.filter(qualification =>
				formState.defaultValues?.qualifications?.includes(parseInt(qualification.value))
			),
		[]
	)

	const [selectedQualifications, setSelectedQualifications] = useState<{ value: string; label: string }[] | null>(
		defaultQualifications ?? null
	)

	useEffect(() => {
		field.onChange(selectedQualifications?.map(q => parseInt(q.value)) ?? [])
	}, [selectedQualifications])

	return (
		<FormField
			control={control}
			name={accessorKey}
			render={({ field }) => (
				<FormItem>
					{label && <FormLabel>{label}</FormLabel>}
					<FormControl>
						{qualificationsOptions?.length ? (
							<MultiSelect
								options={qualificationsOptions}
								selected={selectedQualifications}
								setSelected={setSelectedQualifications}
								placeholder={'Wybierz kwalifikacje'}
							/>
						) : (
							<Skeleton className='h-10 w-full' />
						)}
					</FormControl>

					<FormMessage />
				</FormItem>
			)}
		/>
	)
}
