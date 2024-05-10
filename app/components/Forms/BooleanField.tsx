import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/app/components/ui/Form'
import { Control, FieldPath, FieldValues } from 'react-hook-form'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'

type Props<T extends FieldValues> = {
	control?: Control<T>
	accessorKey: FieldPath<T>
	label?: string
	options?: [string, string]
	description?: string
}

export const BooleanField = <T extends FieldValues>({
	control,
	label,
	options,
	accessorKey,
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
						<RadioGroup
							onValueChange={value => field.onChange(value === 'true')}
							defaultValue={field.value === true ? 'true' : 'false'}
							value={field.value === true ? 'true' : 'false'}
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
