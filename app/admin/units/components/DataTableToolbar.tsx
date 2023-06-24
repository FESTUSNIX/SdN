'use client'

import { Table } from '@tanstack/react-table'
import { X } from 'lucide-react'

import { DataTableViewOptions } from './DataTableViewOptions'

import { Button } from '@/app/components/ui/Button'
import { Input } from '@/app/components/ui/Input'
import { unitStatus, unitTypes } from '../constants/tableData'
import { DataTableFacetedFilter } from './DataTableFacetedFilter'

interface DataTableToolbarProps<TData> {
	table: Table<TData>
}

export function DataTableToolbar<TData>({ table }: DataTableToolbarProps<TData>) {
	const isFiltered = table.getPreFilteredRowModel().rows.length > table.getFilteredRowModel().rows.length

	return (
		<div className='flex items-center justify-between'>
			<div className='flex flex-1 items-center space-x-2'>
				<Input
					placeholder='Filter units...'
					value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
					onChange={event => table.getColumn('name')?.setFilterValue(event.target.value)}
					className='h-8 w-[150px] lg:w-[250px]'
				/>
				{table.getColumn('unitType') && (
					<DataTableFacetedFilter column={table.getColumn('unitType')} title='Type' options={unitTypes} />
				)}
				{table.getColumn('status') && (
					<DataTableFacetedFilter column={table.getColumn('status')} title='Status' options={unitStatus} />
				)}

				{isFiltered && (
					<Button variant='ghost' onClick={() => table.resetColumnFilters()} className='h-8 px-2 lg:px-3'>
						Reset
						<X className='ml-2 h-4 w-4' />
					</Button>
				)}
			</div>
			<DataTableViewOptions table={table} />
		</div>
	)
}
