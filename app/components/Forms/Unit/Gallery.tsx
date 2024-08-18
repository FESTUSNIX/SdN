'use client'

import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/app/components/ui/Form'
import { Control, FieldPath, FieldValues, useFormContext } from 'react-hook-form'
import { GalleryPanel } from '../../GalleryPanel'

type Props<T extends FieldValues> = {
	accessorKey: FieldPath<T>
	control?: Control<T>
	label?: string
	description?: string
}

export const GalleryField = <T extends FieldValues>({ accessorKey, control, label, description }: Props<T>) => {
	const { resetField } = useFormContext()

	return (
		<FormField
			control={control}
			name={accessorKey}
			render={({ field, fieldState: { isDirty } }) => (
				<FormItem>
					{label && <FormLabel>{label}</FormLabel>}
					<FormControl>
						<GalleryPanel
							images={field.value as any}
							onChange={field.onChange}
							resetField={() => resetField('gallery')}
							isDirty={isDirty}
						/>
					</FormControl>
					{description && <FormDescription>{description}</FormDescription>}
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}
