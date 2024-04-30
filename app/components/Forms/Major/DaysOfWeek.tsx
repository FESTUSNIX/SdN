import { DaysOfWeek as DaysOfWeekType } from '@prisma/client'
import { Control, FieldPath, FieldValues } from 'react-hook-form'
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
							selected={field.value}
							setSelected={field.onChange}
							placeholder={'Wybierz dni zajęć'}
						/>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}
