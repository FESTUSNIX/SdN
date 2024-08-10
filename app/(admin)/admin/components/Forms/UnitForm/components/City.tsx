import { Button } from '@/app/components/ui/Button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/app/components/ui/Command'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/app/components/ui/Form'
import { Popover, PopoverContent, PopoverTrigger } from '@/app/components/ui/Popover'
import { ScrollArea } from '@/app/components/ui/ScrollArea'
import { cn } from '@/lib/utils'
import { UnitFormType } from '@/lib/validators/unit'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Check, ChevronsUpDown } from 'lucide-react'
import { useState } from 'react'

type Props = {
	form: UnitFormType
}

const City = ({ form }: Props) => {
	const [open, setOpen] = useState(false)

	const { data: cities } = useQuery({
		queryKey: ['cities'],
		queryFn: async () => {
			const { data } = await axios.get<{ id: number; name: string }[]>('/api/cities')

			return data
		}
	})

	if (!cities) return null

	return (
		<FormField
			control={form.control}
			name='cityId'
			render={({ field }) => (
				<FormItem className='flex flex-col'>
					<FormLabel>City</FormLabel>
					<Popover open={open} onOpenChange={setOpen}>
						<PopoverTrigger asChild>
							<FormControl>
								<Button
									variant='outline'
									role='combobox'
									aria-expanded={open}
									className={cn('w-full justify-between', !field.value && 'text-muted-foreground')}>
									{field.value ? cities.find(option => option.id === field.value)?.name : 'Select city'}
									<ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
								</Button>
							</FormControl>
						</PopoverTrigger>
						<PopoverContent className='w-[200px] p-0'>
							<Command>
								<CommandInput placeholder='Search city...' />
								<CommandEmpty>No city found.</CommandEmpty>
								<ScrollArea className='h-64'>
									<CommandGroup>
										{cities.map(option => (
											<CommandItem
												value={option.name}
												key={option.id}
												onSelect={value => {
													form.setValue('cityId', cities.filter(option => option.name.toLowerCase() === value)?.[0]?.id)
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
