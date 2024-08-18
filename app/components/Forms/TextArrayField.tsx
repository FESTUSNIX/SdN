'use client'

import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/app/components/ui/form'
import { InputProps } from '@/app/components/ui/input'
import { Control, FieldPath, FieldValues } from 'react-hook-form'
import { ArrayInput } from '../ArrayInput'

type Props<T extends FieldValues> = {
	accessorKey: FieldPath<T>
	control?: Control<T>
	label?: string
	description?: string
	placeholder?: string
	maxItemLength?: number
	maxLength?: number
} & { inputProps?: Omit<InputProps, 'onChange'> }

export const TextArrayField = <T extends FieldValues>({
	accessorKey,
	control,
	label,
	description,
	placeholder,
	maxItemLength,
	maxLength,
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
						<ArrayInput
							{...inputProps}
							values={field.value}
							setValues={field.onChange}
							placeholder={placeholder}
							maxItemLength={maxItemLength}
							maxLength={maxLength}
							ref={field.ref}
							onBlur={field.onBlur}
						/>
					</FormControl>
					{description && <FormDescription>{description}</FormDescription>}
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}
