import { Button } from '@/app/components/ui/Button'
import { Calendar } from '@/app/components/ui/Calendar'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/app/components/ui/Form'
import { Popover, PopoverContent, PopoverTrigger } from '@/app/components/ui/Popover'
import { cn } from '@/lib/utils/utils'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { Control } from 'react-hook-form'

type Props = {
	control: Control<any>
	accessorKey: string
	label?: string
	placeholder?: string
}

export const DatePicker = ({ control, label, accessorKey, placeholder = 'Pick a date' }: Props) => {
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
									disabled={date => date < new Date()}
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
