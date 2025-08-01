'use client'

import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { Table } from '@tanstack/react-table'
import { SlidersHorizontal } from 'lucide-react'

import { Button } from '@/app/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator
} from '@/app/components/ui/dropdown-menu'

interface DataTableViewOptionsProps<TData> {
	table: Table<TData>
}

export function ViewOptions<TData>({ table }: DataTableViewOptionsProps<TData>) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='outline' size='sm' className='flex h-8 md:ml-auto'>
					<SlidersHorizontal className='mr-2 h-4 w-4' />
					View
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end' className='w-[150px]'>
				<DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
				<DropdownMenuSeparator />
				{table
					.getAllColumns()
					.filter(column => typeof column.accessorFn !== 'undefined' && column.getCanHide())
					.map(column => {
						return (
							<DropdownMenuCheckboxItem
								key={column.id}
								className='capitalize'
								checked={column.getIsVisible()}
								onCheckedChange={value => column.toggleVisibility(!!value)}>
								{column.id}
							</DropdownMenuCheckboxItem>
						)
					})}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
