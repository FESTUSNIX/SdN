import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/app/components/ui/form'
import { Control, FieldPath, FieldValues } from 'react-hook-form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

type Props<T extends FieldValues> = {
	control?: Control<T>
	accessorKey: FieldPath<T>
	options: {
		label: string
		value: string
	}[]
	label?: string
	placeholder?: string
	description?: string
}

export const SelectField = <T extends FieldValues>({
	control,
	label,
	options,
	accessorKey,
	placeholder = 'Wybierz opcję',
	description
}: Props<T>) => {
	return (
		<FormField
			control={control}
			name={accessorKey}
			render={({ field }) => (
				<FormItem>
					{label && <FormLabel>{label}</FormLabel>}
					<FormControl>
						<Select
							onValueChange={field.onChange as (value: string) => void}
							value={field.value}
							defaultValue={field.value}>
							<FormControl>
								<SelectTrigger>
									<SelectValue placeholder={placeholder} />
								</SelectTrigger>
							</FormControl>
							<SelectContent>
								{options.map(option => (
									<SelectItem key={option.value} value={option.value}>
										{option.label}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</FormControl>
					{description && <FormDescription>{description}</FormDescription>}
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}
