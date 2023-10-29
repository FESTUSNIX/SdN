import { DaysOfWeek as DaysOfWeekType } from '@prisma/client'
import { useEffect, useMemo, useState } from 'react'
import { Control, FieldPath, FieldValues, useController } from 'react-hook-form'
import { MultiSelect } from '../../MultiSelect'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../ui/Form'

type Props<T extends FieldValues> = {
	accessorKey: FieldPath<T>
	control?: Control<T>
	label?: string
}

const dayOptions: { label: string; value: DaysOfWeekType }[] = [
	{ label: 'Poniedziałek', value: 'MONDAY' },
	{ label: 'Wtorek', value: 'TUESDAY' },
	{ label: 'Środa', value: 'WEDNESDAY' },
	{ label: 'Czwartek', value: 'THURSDAY' },
	{ label: 'Piątek', value: 'FRIDAY' },
	{ label: 'Sobota', value: 'SATURDAY' },
	{ label: 'Niedziela', value: 'SUNDAY' }
]

export const DaysOfWeek = <T extends FieldValues>({ control, accessorKey, label }: Props<T>) => {
	const { field, formState } = useController({ name: accessorKey, control: control })

	const defaultQualifications = useMemo(
		() =>
			dayOptions?.filter(qualification =>
				formState.defaultValues?.qualifications?.includes(parseInt(qualification.value))
			),
		[]
	)

	const [selectedDays, setSelectedDays] = useState<{ label: string; value: string }[] | null>(
		defaultQualifications ?? null
	)

	useEffect(() => {
		console.log(selectedDays?.map(q => q.value))
		field.onChange((selectedDays?.map(q => q.value) ?? []) as DaysOfWeekType[])
	}, [selectedDays])

	return (
		<FormField
			control={control}
			name={accessorKey}
			render={({ field }) => (
				<FormItem>
					{label && <FormLabel>{label}</FormLabel>}
					<FormControl>
						<MultiSelect
							options={dayOptions}
							selected={selectedDays}
							setSelected={setSelectedDays}
							placeholder={'Wybierz dni zajęć'}
						/>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}
