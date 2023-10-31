import { FieldPath, FieldValues, useController } from 'react-hook-form'
import { FormLabel } from '../ui/Form'
import ResetField from './ResetField'

type Props<T extends FieldValues> = {
	accessorKey: FieldPath<T>
	label: string
	disableReset?: boolean
}

const FieldTitle = <T extends FieldValues>({ label, accessorKey, disableReset }: Props<T>) => {
	const { field, formState } = useController({ name: accessorKey })

	return (
		<div className='flex items-center justify-between'>
			<FormLabel>{label}</FormLabel>

			{disableReset && (
				<ResetField
					defaultValue={formState.defaultValues?.[accessorKey]}
					currentValue={field.value}
					resetFn={() => field.onChange(formState.defaultValues?.[accessorKey])}
				/>
			)}
		</div>
	)
}

export default FieldTitle
