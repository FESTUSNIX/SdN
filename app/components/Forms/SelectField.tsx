import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/app/components/ui/Form'
import { Control, FieldValues, Path } from 'react-hook-form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/Select'

type Props<T extends FieldValues> = {
	formControl: Control<T>
	accessorKey: Path<T>
	options: {
		label: string
		value: string
	}[]
	label?: string
	placeholder?: string
	description?: string
}

export const SelectField = <T extends FieldValues>({
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
						<Select onValueChange={field.onChange as (value: string) => void} defaultValue={field.value}>
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
