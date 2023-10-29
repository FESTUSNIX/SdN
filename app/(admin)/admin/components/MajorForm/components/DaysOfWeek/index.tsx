import { MultiSelect } from '@/app/components/Select'
import { FormField, FormItem, FormLabel, FormMessage } from '@/app/components/ui/Form'
import { Control } from 'react-hook-form'

type Props = {
	control: Control<any>
}

const dayOptions = [
	{ label: 'Monday', value: 'MONDAY' },
	{ label: 'Tuesday', value: 'TUESDAY' },
	{ label: 'Wednesday', value: 'WEDNESDAY' },
	{ label: 'Thursday', value: 'THURSDAY' },
	{ label: 'Friday', value: 'FRIDAY' },
	{ label: 'Saturday', value: 'SATURDAY' },
	{ label: 'Sunday', value: 'SUNDAY' }
]

const DaysOfWeek = ({ control }: Props) => {
	return (
		<FormField
			control={control}
			name='daysOfWeek'
			render={({ field }) => (
				<FormItem>
					<FormLabel>Days of week</FormLabel>
					<MultiSelect options={dayOptions} onSelectChange={field.onChange} placeholder='Select days of week...' />
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}

export default DaysOfWeek
