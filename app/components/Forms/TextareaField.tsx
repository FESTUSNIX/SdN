'use client'

import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/app/components/ui/Form'
import { Control, FieldPath, FieldValues } from 'react-hook-form'
import { Textarea, TextareaProps } from '../ui/Textarea/textarea'

type Props<T extends FieldValues> = {
	accessorKey: FieldPath<T>
	control?: Control<T>
	label?: string
	description?: string
	placeholder?: string
} & { textareaProps?: TextareaProps }

export const TextareaField = <T extends FieldValues>({
	label,
	description,
	accessorKey,
	control,
	placeholder,
	textareaProps
}: Props<T>) => {
	return (
		<FormField
			control={control}
			name={accessorKey}
			render={({ field }) => (
				<FormItem>
					{label && <FormLabel>{label}</FormLabel>}
					<FormControl>
						<Textarea {...field} {...textareaProps} placeholder={placeholder} value={field.value ?? ''} />
					</FormControl>
					{description && <FormDescription>{description}</FormDescription>}
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}
