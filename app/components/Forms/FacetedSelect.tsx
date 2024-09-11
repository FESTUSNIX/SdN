import { Badge } from '@/app/components/ui/badge'
import { Button } from '@/app/components/ui/button'
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator
} from '@/app/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/app/components/ui/popover'
import { Separator } from '@/app/components/ui/separator'
import { cn } from '@/lib/utils'
import { CheckIcon, PlusCircle } from 'lucide-react'
import { type ComponentType, useEffect, useState } from 'react'

export type FilterOption = {
	label: string
	value: string
	icon?: ComponentType<{ className?: string }>
}

type FacetedSelect = {
	options: FilterOption[]
	title?: string
	defaultValues?: string[]
	onChange?: (values: string[]) => void
	maxDisplayed?: number
}

export function FacetedSelect({ title, options, defaultValues = [], onChange, maxDisplayed = 3 }: FacetedSelect) {
	const [selectedValues, setSelectedValues] = useState<string[]>(defaultValues)

	useEffect(() => {
		onChange && onChange(selectedValues)
	}, [selectedValues])

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant='outline' size='sm' className='h-9 rounded-full border-dashed'>
					<PlusCircle className='mr-2 h-4 w-4' />
					{title}
					{selectedValues?.length > 0 && (
						<>
							<Separator orientation='vertical' className='mx-2 h-4' />
							<Badge variant='secondary' className='rounded-sm px-1 font-normal lg:hidden'>
								{selectedValues.length}
							</Badge>
							<div className='hidden space-x-1 lg:flex'>
								{selectedValues.length > maxDisplayed ? (
									<Badge variant='secondary' className='rounded-sm px-1 font-normal'>
										{selectedValues.length} wybrane
									</Badge>
								) : (
									options
										.filter(option => selectedValues.includes(option.value))
										.map(option => (
											<Badge variant='secondary' key={option.value} className='rounded-sm px-1 font-normal'>
												{option.label}
											</Badge>
										))
								)}
							</div>
						</>
					)}
				</Button>
			</PopoverTrigger>
			<PopoverContent className='max-w-[320px] p-0' align='start'>
				<Command>
					<CommandInput placeholder={title} />
					<CommandList>
						<CommandEmpty>Brak wyników</CommandEmpty>
						<CommandGroup>
							{options?.map(option => {
								const isSelected = selectedValues.includes(option.value)
								return (
									<CommandItem
										key={option.value}
										onSelect={() => {
											setSelectedValues(prev => {
												if (prev.includes(option.value)) {
													return prev.filter(v => v !== option.value)
												}
												return [...prev, option.value]
											})
										}}>
										<div
											className={cn(
												'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
												isSelected ? 'bg-primary text-primary-foreground' : 'opacity-50 [&_svg]:invisible'
											)}>
											<CheckIcon className={cn('h-4 w-4')} aria-hidden='true' />
										</div>
										{option.icon && <option.icon className='mr-2 h-4 w-4 text-muted-foreground' aria-hidden='true' />}
										<span>{option.label}</span>
									</CommandItem>
								)
							})}
						</CommandGroup>
						{selectedValues.length > 0 && (
							<>
								<CommandSeparator />
								<CommandGroup>
									<CommandItem onSelect={() => setSelectedValues([])} className='justify-center text-center'>
										Wyczyść filtry
									</CommandItem>
								</CommandGroup>
							</>
						)}
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	)
}

export const FacetedSelectPlaceholder = ({ title }: { title: string }) => {
	return (
		<Button variant='outline' size='sm' className='h-9 rounded-full border-dashed' disabled>
			<PlusCircle className='mr-2 h-4 w-4' />
			{title}
		</Button>
	)
}
