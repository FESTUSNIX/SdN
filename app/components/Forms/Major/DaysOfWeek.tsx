import { MajorFormType } from '@/lib/validators/major'
import { DaysOfWeek as DaysOfWeekType } from '@prisma/client'
import { useEffect, useMemo, useState } from 'react'
import { MultiSelect } from '../../MultiSelect'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../ui/Form'

type Props = {
	form: MajorFormType
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

export const DaysOfWeek = ({ form }: Props) => {
	const defaultQualifications = useMemo(
		() =>
			dayOptions?.filter(qualification =>
				form.formState.defaultValues?.qualifications?.includes(parseInt(qualification.value))
			),
		[]
	)

	const [selectedDays, setSelectedDays] = useState<{ label: string; value: string }[] | null>(
		defaultQualifications ?? null
	)

	useEffect(() => {
		form.setValue('daysOfWeek', (selectedDays?.map(q => q.value) ?? []) as DaysOfWeekType[])
	}, [selectedDays])

	return (
		<FormField
			control={form.control}
			name={'daysOfWeek'}
			render={({ field }) => (
				<FormItem>
					<FormLabel>Zajęcia odbywają się w</FormLabel>
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
