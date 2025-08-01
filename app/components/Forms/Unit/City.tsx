import { Button } from '@/app/components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/app/components/ui/command'
import { FormControl, FormField, FormItem, FormMessage } from '@/app/components/ui/form'
import { Popover, PopoverContent, PopoverTrigger } from '@/app/components/ui/popover'
import { ScrollArea } from '@/app/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import { Check, ChevronsUpDown } from 'lucide-react'
import { cache, use, useState } from 'react'
import { Control, FieldPath, FieldValues } from 'react-hook-form'
import FieldTitle from '../FieldTitle'
import { Skeleton } from '../../ui/skeleton'

type Props<T extends FieldValues> = {
	accessorKey: FieldPath<T>
	control?: Control<T>
	label?: string
	disableReset?: boolean
}

const getCities = cache(() =>
	fetch('/api/cities', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	}).then(res => res.json())
)

const City = <T extends FieldValues>({ accessorKey, control, label, disableReset }: Props<T>) => {
	const [open, setOpen] = useState(false)
	const cities = use<{ id: number; name: string }[]>(getCities())

	if (!cities) return <Skeleton className='h-10 w-full' />

	return (
		<FormField
			control={control}
			name={accessorKey}
			render={({ field }) => (
				<FormItem className='flex flex-col'>
					{label && <FieldTitle accessorKey={accessorKey} disableReset={disableReset} label={label} />}
					<Popover open={open} onOpenChange={setOpen}>
						<PopoverTrigger asChild>
							<FormControl>
								<Button
									variant='outline'
									role='combobox'
									aria-expanded={open}
									className={cn('w-full justify-between', !field.value && 'text-muted-foreground')}>
									{field.value ? cities.find(option => option.id === field.value)?.name : 'Wybierz miasto'}
									<ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
								</Button>
							</FormControl>
						</PopoverTrigger>
						<PopoverContent className='w-[200px] p-0'>
							<Command>
								<CommandInput placeholder='Wyszukaj miasto...' />
								<CommandEmpty>Nie odnaleziono miasta.</CommandEmpty>
								<ScrollArea className='h-64'>
									<CommandGroup>
										{cities.map(option => (
											<CommandItem
												value={option.name}
												key={option.id}
												onSelect={value => {
													field.onChange(cities.filter(option => option.name.toLowerCase() === value)?.[0]?.id)
													setOpen(false)
												}}>
												<Check
													className={cn('mr-2 h-4 w-4', option.id === field.value ? 'opacity-100' : 'opacity-0')}
												/>
												{option.name}
											</CommandItem>
										))}
									</CommandGroup>
								</ScrollArea>
							</Command>
						</PopoverContent>
					</Popover>
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}

export default City
