import { FieldValues, Path, UseFormReturn } from 'react-hook-form'
import { FormLabel } from '../ui/Form'
import ResetField from './ResetField'

type Props<T extends FieldValues> = { form: UseFormReturn<T> } & {
	fieldName: Path<T>
	label: string
}

const FieldTitle = <T extends FieldValues>({ label, fieldName, form }: Props<T>) => {
	return (
		<div className='flex items-center justify-between'>
			<FormLabel>{label}</FormLabel>

			<ResetField
				defaultValue={form.formState.defaultValues?.[fieldName]}
				currentValue={form.getValues(fieldName)}
				resetFn={() => form.resetField(fieldName)}
			/>
		</div>
	)
}

export default FieldTitle
