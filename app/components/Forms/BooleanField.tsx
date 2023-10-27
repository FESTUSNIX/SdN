import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/app/components/ui/Form'
import { Control, FieldValues, Path } from 'react-hook-form'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'

type Props<T extends FieldValues> = {
	formControl: Control<T>
	accessorKey: Path<T>
	label?: string
	options?: [string, string]
	description?: string
}

export const BooleanField = <T extends FieldValues>({
	formControl,
	label,
	options,
	accessorKey,
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
						<RadioGroup
							onValueChange={value => field.onChange(value === 'true')}
							defaultValue={field.value ? 'true' : 'false'}
							value={field.value ? 'true' : 'false'}
							className='flex flex-col'>
							<FormItem className='flex items-center space-x-3 space-y-0'>
								<FormControl>
									<RadioGroupItem value='true' />
								</FormControl>
								<FormLabel className='font-normal'>{options?.[0] ?? 'Tak'}</FormLabel>
							</FormItem>
							<FormItem className='flex items-center space-x-3 space-y-0'>
								<FormControl>
									<RadioGroupItem value='false' />
								</FormControl>
								<FormLabel className='font-normal'>{options?.[1] ?? 'Nie'}</FormLabel>
							</FormItem>
						</RadioGroup>
					</FormControl>
					{description && <FormDescription>{description}</FormDescription>}
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}
