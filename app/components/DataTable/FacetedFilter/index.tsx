import * as React from 'react'
import { type Column } from '@tanstack/react-table'

import { cn } from '@/lib/utils'
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
import { CheckIcon, PlusCircle } from 'lucide-react'
import { Separator } from '../../ui/separator'

export type FilterOption = {
	label: string
	value: string
	icon?: React.ComponentType<{ className?: string }>
}

interface DataTableFacetedFilter<TData, TValue> {
	column?: Column<TData, TValue>
	title?: string
	options: FilterOption[]
}

export function FacetedFilter<TData, TValue>({ column, title, options }: DataTableFacetedFilter<TData, TValue>) {
	const selectedValues = new Set(column?.getFilterValue() as string[])

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant='outline' size='sm' className='h-8 border-dashed'>
					<PlusCircle className='mr-2 h-4 w-4' />
					{title}
					{selectedValues?.size > 0 && (
						<>
							<Separator orientation='vertical' className='mx-2 h-4' />
							<Badge variant='secondary' className='rounded-sm px-1 font-normal lg:hidden'>
								{selectedValues.size}
							</Badge>
							<div className='hidden space-x-1 lg:flex'>
								{selectedValues.size > 2 ? (
									<Badge variant='secondary' className='rounded-sm px-1 font-normal'>
										{selectedValues.size} selected
									</Badge>
								) : (
									options
										.filter(option => selectedValues.has(option.value))
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
						<CommandEmpty>No results found.</CommandEmpty>
						<CommandGroup>
							{options?.map(option => {
								const isSelected = selectedValues.has(option.value)
								return (
									<CommandItem
										key={option.value}
										onSelect={() => {
											if (isSelected) {
												selectedValues.delete(option.value)
											} else {
												selectedValues.add(option.value)
											}
											const filterValues = Array.from(selectedValues)
											column?.setFilterValue(filterValues.length ? filterValues : undefined)
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
						{selectedValues.size > 0 && (
							<>
								<CommandSeparator />
								<CommandGroup>
									<CommandItem
										onSelect={() => column?.setFilterValue(undefined)}
										className='justify-center text-center'>
										Clear filters
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
