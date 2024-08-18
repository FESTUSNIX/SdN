import { Button } from '@/app/components/ui/button'
import { Calendar } from '@/app/components/ui/calendar'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/app/components/ui/form'
import { Popover, PopoverContent, PopoverTrigger } from '@/app/components/ui/popover'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { Control, FieldPath, FieldValues } from 'react-hook-form'

type Props<T extends FieldValues> = {
	control?: Control<T>
	accessorKey: FieldPath<T>
	label?: string
	placeholder?: string
}

export const DateField = <T extends FieldValues>({
	control,
	label,
	accessorKey,
	placeholder = 'Wybierz datę'
}: Props<T>) => {
	return (
		<FormField
			control={control}
			name={accessorKey}
			render={({ field }) => (
				<FormItem>
					{label && <FormLabel>{label}</FormLabel>}
					<FormControl>
						<Popover>
							<PopoverTrigger asChild>
								<FormControl>
									<Button
										variant={'outline'}
										className={cn('w-full pl-3 text-left font-normal', !field.value && 'text-muted-foreground')}>
										{field.value ? format(field.value, 'yyyy-MM-dd') : <span>{placeholder}</span>}
										<CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
									</Button>
								</FormControl>
							</PopoverTrigger>
							<PopoverContent className='w-auto p-0' align='start'>
								<Calendar
									mode='single'
									selected={field.value}
									onSelect={e => {
										field.onChange(e)
									}}
									disabled={{ before: new Date() }}
									initialFocus
								/>
							</PopoverContent>
						</Popover>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}
