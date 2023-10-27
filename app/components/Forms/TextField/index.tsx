import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/app/components/ui/Form'
import { Input } from '@/app/components/ui/Input'
import { Control, FieldValues, Path } from 'react-hook-form'
import { Textarea } from '../../ui/Textarea/textarea'
import { HTMLInputTypeAttribute } from 'react'

type Props<T extends FieldValues> = {
	formControl: Control<T>
	accessorKey: Path<T>
	label?: string
	placeholder?: string
	description?: string
	type?: HTMLInputTypeAttribute
	nullable?: boolean
	textarea?: boolean
}

export const TextField = <T extends FieldValues>({
	formControl,
	label,
	accessorKey,
	placeholder,
	description,
	type = 'text',
	nullable = false,
	textarea
}: Props<T>) => {
	return (
		<FormField
			control={formControl}
			name={accessorKey}
			render={({ field }) => (
				<FormItem>
					{label && <FormLabel>{label}</FormLabel>}
					<FormControl>
						{textarea ? (
							<Textarea {...field} placeholder={placeholder} value={field.value ?? ''} />
						) : (
							<Input {...field} type={type} placeholder={placeholder} value={field.value ?? ''} />
						)}
					</FormControl>
					{description && <FormDescription>{description}</FormDescription>}
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}
