import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/app/components/ui/Form'
import { Input } from '@/app/components/ui/Input'
import { QualificationFormType, QualificationPayload } from '@/lib/validators/qualification'
import { Control } from 'react-hook-form'

type Props = {
	formControl: Control<QualificationPayload>
}

const Keywords = ({ formControl }: Props) => {
	return (
		<FormField
			control={formControl}
			name={'keywords'}
			render={({ field }) => (
				<FormItem>
					<FormLabel>Keywords</FormLabel>
					<FormControl>
						<Input
							{...field}
							placeholder={''}
							value={field.value ?? ''}
							onChange={e => {
								field.onChange(['TEST_1', 'TEST_2'])
							}}
						/>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}

export default Keywords
