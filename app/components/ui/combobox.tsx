'use client'

import { Check, ChevronsUpDown } from 'lucide-react'

import { Button } from '@/app/components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/app/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/app/components/ui/popover'
import { cn } from '@/lib/utils'
import { useState } from 'react'

export type ComboboxProps = {
	value: any
	setValue: (value: any) => void
	options: {
		value: string
		label: string
	}[]
	emptyText?: string
	placeholder?: string
	searchPlaceholder?: string
}

export function Combobox({
	emptyText = 'Not found',
	placeholder,
	searchPlaceholder,
	value,
	setValue,
	options
}: ComboboxProps) {
	const [open, setOpen] = useState(false)

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button variant='outline' role='combobox' aria-expanded={open} className='w-full justify-between'>
					{value ? options.find(option => option.value === value)?.label ?? placeholder : placeholder}
					<ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
				</Button>
			</PopoverTrigger>
			<PopoverContent className='h-[300px] w-[260px] p-0'>
				<Command>
					<CommandInput placeholder={searchPlaceholder} />
					<CommandEmpty>{emptyText}</CommandEmpty>
					<CommandGroup className='overflow-y-auto'>
						{options.map(option => (
							<CommandItem
								key={option.value}
								value={option.label}
								onSelect={() => {
									setValue(option.value === value ? '' : option.value)
									setOpen(false)
								}}>
								<Check className={cn('mr-2 h-4 w-4', value === option.value ? 'opacity-100' : 'opacity-0')} />
								{option.label}
							</CommandItem>
						))}
					</CommandGroup>
				</Command>
			</PopoverContent>
		</Popover>
	)
}
