'use client'

import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/app/components/ui/form'
import { Input, InputProps } from '@/app/components/ui/input'
import { HTMLInputTypeAttribute } from 'react'
import { Control, FieldPath, FieldValues } from 'react-hook-form'

type Props<T extends FieldValues> = {
	accessorKey: FieldPath<T>
	control?: Control<T>
	label?: string
	description?: string
	placeholder?: string
	type?: HTMLInputTypeAttribute
} & { inputProps?: InputProps }

export const TextField = <T extends FieldValues>({
	accessorKey,
	control,
	label,
	description,
	placeholder,
	type,
	inputProps
}: Props<T>) => {
	return (
		<FormField
			control={control}
			name={accessorKey}
			render={({ field }) => (
				<FormItem>
					{label && <FormLabel>{label}</FormLabel>}
					<FormControl>
						<Input {...field} {...inputProps} placeholder={placeholder} type={type} value={field.value ?? ''} />
					</FormControl>
					{description && <FormDescription>{description}</FormDescription>}
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}
