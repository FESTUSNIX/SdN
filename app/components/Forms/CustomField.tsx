'use client'

import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/app/components/ui/form'
import { Control, ControllerRenderProps, FieldPath, FieldValues } from 'react-hook-form'

type Props<T extends FieldValues> = {
	render: (props: { field: ControllerRenderProps<T, FieldPath<T>> }) => JSX.Element
	accessorKey: FieldPath<T>
	control?: Control<T>
	label?: string
	description?: string
}

export const CustomField = <T extends FieldValues>({ render, accessorKey, control, label, description }: Props<T>) => {
	return (
		<FormField
			control={control}
			name={accessorKey}
			render={({ field }) => (
				<FormItem>
					{label && <FormLabel>{label}</FormLabel>}
					<FormControl>{render({ field })}</FormControl>
					{description && <FormDescription>{description}</FormDescription>}
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}
