'use client'

import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/app/components/ui/Form'
import { InputProps } from '@/app/components/ui/Input'
import { Control, FieldPath, FieldValues, UseFormClearErrors, UseFormSetError } from 'react-hook-form'
import { ArrayInput } from '../../ArrayInput'

type Props<T extends FieldValues> = {
	accessorKey: FieldPath<T>
	control?: Control<T>
	label?: string
	description?: string
	placeholder?: string
	maxItemLength?: number
	maxLength?: number
	setError: UseFormSetError<T>
	clearErrors: UseFormClearErrors<T>
} & { inputProps?: Omit<InputProps, 'onChange'> }

export const KeywordsField = <T extends FieldValues>({
	accessorKey,
	control,
	label,
	description,
	placeholder,
	maxItemLength,
	maxLength,
	inputProps,
	setError,
	clearErrors
}: Props<T>) => {
	const onMaxLengthError = (value: string) => {
		setError(accessorKey, {
			type: 'custom',
			message: `Maksymalna liczba słów kluczowych to ${maxLength}`
		})
	}

	const onMaxItemLengthError = (value: string) => {
		setError(accessorKey, {
			type: 'custom',
			message: `Słowo kluczowe nie może mieć więcej niż ${maxItemLength} znaków`
		})
	}

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
							onMaxLengthError={onMaxLengthError}
							onMaxItemLengthError={onMaxItemLengthError}
							onBlur={() => {
								clearErrors(accessorKey)
								field.onBlur()
							}}
							clearErrors={clearErrors}
							ref={field.ref}
						/>
					</FormControl>
					{description && <FormDescription>{description}</FormDescription>}
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}
