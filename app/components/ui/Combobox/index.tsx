'use client'

import { Check, ChevronsUpDown } from 'lucide-react'

import { cn } from '@/lib/utils/utils'
import { Button } from '@/app/components/ui/Button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/app/components/ui/Command'
import { Popover, PopoverContent, PopoverTrigger } from '@/app/components/ui/Popover'
import { useState } from 'react'

type Props = {
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

export function ComboboxDemo({
	emptyText = 'Not found',
	placeholder,
	searchPlaceholder,
	value,
	setValue,
	options
}: Props) {
	const [open, setOpen] = useState(false)

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button variant='outline' role='combobox' aria-expanded={open} className='w-full justify-between'>
					{value ? options.find(option => option.value === value)?.label : placeholder}
					<ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
				</Button>
			</PopoverTrigger>
			<PopoverContent className='w-[200px] p-0'>
				<Command>
					<CommandInput placeholder={searchPlaceholder} />
					<CommandEmpty>{emptyText}</CommandEmpty>
					<CommandGroup>
						{options.map(option => (
							<CommandItem
								key={option.value}
								onSelect={currentValue => {
									setValue(currentValue === value ? '' : currentValue)
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
