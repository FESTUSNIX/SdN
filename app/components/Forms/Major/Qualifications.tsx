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

	const { data: qualifications, isSuccess } = useQuery({
		queryKey: ['qualifications'],
		queryFn: async () => {
			const { data } = await axios.get<Qualification[]>('/api/qualifications')

			return data
		},
		cacheTime: 0
	})

	const qualificationsOptions = useMemo(() => {
		return qualifications?.map(qualification => ({
			value: qualification.id.toString(),
			label: qualification.name
		}))
	}, [qualifications])

	const [selectedQualifications, setSelectedQualifications] = useState<string[] | null>(
		qualificationsOptions
			?.filter(qualification =>
				formState.defaultValues?.qualifications?.find(
					(q: { id: number; name: string }) => q.id === parseInt(qualification.value)
				)
			)
			?.map(q => q.value) ?? null
	)

	useEffect(() => {
		if (qualifications && selectedQualifications === null) {
			setSelectedQualifications(
				qualificationsOptions
					?.filter(qualification =>
						formState.defaultValues?.qualifications?.find(
							(q: { id: number; name: string }) => q.id === parseInt(qualification.value)
						)
					)
					?.map(q => q.value) ?? null
			)
		}
	}, [qualifications])

	useEffect(() => {
		const newQualifications =
			selectedQualifications?.map(id => ({
				id: parseInt(id),
				name: qualificationsOptions?.find(q => q.value === id)?.label
			})) ?? []

		console.log('NEW', newQualifications)

		field.onChange(newQualifications)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedQualifications])

	return (
		<FormField
			control={control}
			name={accessorKey}
			render={({ field }) => (
				<FormItem>
					{label && <FormLabel>{label}</FormLabel>}
					<FormControl>
						{qualificationsOptions?.length && isSuccess ? (
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
