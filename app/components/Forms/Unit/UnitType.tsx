import { Button } from '@/app/components/ui/Button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/app/components/ui/Command'
import { FormField, FormItem, FormLabel, FormMessage } from '@/app/components/ui/Form'
import { Popover, PopoverContent, PopoverTrigger } from '@/app/components/ui/Popover'
import { cn } from '@/lib/utils'
import { UnitFormType } from '@/lib/validators/unit'
import { Check, ChevronsUpDown, Plus } from 'lucide-react'
import { useState } from 'react'

type Props = {
	form: UnitFormType
}

const unitTypeOptions = [
	{ value: 'uczelnia', label: 'Uczelnia' },
	{ value: 'pdn', label: 'PDN' }
]

const UnitType = ({ form }: Props) => {
	const [open, setOpen] = useState(false)
	const [search, setSearch] = useState('')

	return (
		<>
			<FormField
				control={form.control}
				name='unitType'
				render={({ field }) => (
					<FormItem className='flex flex-col'>
						<FormLabel>Unit Type</FormLabel>
						<Popover
							open={open}
							onOpenChange={open => {
								setSearch('')
								setOpen(open)
							}}>
							<PopoverTrigger asChild>
								<Button
									variant='outline'
									role='combobox'
									aria-expanded={open}
									className={cn('w-full justify-between', !field.value && 'text-muted-foreground')}>
									{field.value
										? unitTypeOptions.find(option => option.value === field.value)?.label ?? field.value
										: 'Select unit type...'}
									<ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
								</Button>
							</PopoverTrigger>
							<PopoverContent className='w-[200px] p-0'>
								<Command>
									<CommandInput placeholder='Search unitType...' value={search} onValueChange={setSearch} />
									<CommandEmpty>No unit type found.</CommandEmpty>
									<CommandGroup>
										{unitTypeOptions.map(option => (
											<CommandItem
												key={option.value}
												onSelect={currentValue => {
													form.setValue('unitType', currentValue === field.value ? '' : currentValue)
													setOpen(false)
												}}>
												<Check
													className={cn('mr-2 h-4 w-4', field.value === option.value ? 'opacity-100' : 'opacity-0')}
												/>
												{option.label}
											</CommandItem>
										))}
										{search && (
											<CommandItem
												key={'createNewUnitType'}
												value={search}
												onSelect={currentValue => {
													form.setValue('unitType', currentValue)
													setOpen(false)
												}}>
												<Plus className={cn('mr-2 h-4 w-4')} />
												Create &quot;{search}&quot;
											</CommandItem>
										)}
									</CommandGroup>
								</Command>
							</PopoverContent>
						</Popover>
						<FormMessage />
					</FormItem>
				)}
			/>
		</>
	)
}

export default UnitType
