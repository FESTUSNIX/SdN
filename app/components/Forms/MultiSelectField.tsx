import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/app/components/ui/Form'
import { Control, FieldValues, Path } from 'react-hook-form'
import { MultiSelect } from '../MultiSelect'
import { Skeleton } from '../ui/skeleton'

type Props<T extends FieldValues> = {
	formControl: Control<T>
	accessorKey: Path<T>
	options:
		| {
				label: string
				value: string
		  }[]
		| undefined
	label?: string
	placeholder?: string
	description?: string
}

export const MultiSelectField = <T extends FieldValues>({
	formControl,
	label,
	options,
	accessorKey,
	placeholder = 'Wybierz opcję',
	description
}: Props<T>) => {
	return (
		<FormField
			control={formControl}
			name={accessorKey}
			render={({ field }) => (
				<FormItem>
					{label && <FormLabel>{label}</FormLabel>}
					<FormControl>
						{options?.length ? (
							<MultiSelect
								options={options}
								selected={field.value}
								setSelected={field.onChange}
								placeholder={placeholder}
							/>
						) : (
							<Skeleton className='h-10 w-full' />
						)}
					</FormControl>
					{description && <FormDescription>{description}</FormDescription>}
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}
