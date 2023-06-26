'use client'

import { Table } from '@tanstack/react-table'
import { Plus, X } from 'lucide-react'

import { DataTableViewOptions } from './DataTableViewOptions'

import { Button } from '@/app/components/ui/Button'
import { Input } from '@/app/components/ui/Input'
import { unitStatus, unitTypes } from '../constants/tableData'
import { DataTableFacetedFilter } from './DataTableFacetedFilter'
import UnitForm from '../../components/modules/UnitForm'
import AddUnitForm from './AddUnitForm'
import { useFormContext } from '../hooks/useFormContext'

interface DataTableToolbarProps<TData> {
	table: Table<TData>
}

export function DataTableToolbar<TData>({ table }: DataTableToolbarProps<TData>) {
	const isFiltered = table.getPreFilteredRowModel().rows.length > table.getFilteredRowModel().rows.length
	const { setOpenAdd } = useFormContext()

	return (
		<div className='flex md:items-center md:justify-between flex-wrap gap-y-2 flex-col md:flex-row'>
			<div className='flex flex-1 items-center gap-2 flex-wrap'>
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

			<div className='flex items-center gap-2'>
				<DataTableViewOptions table={table} />
				<Button variant='default' size='sm' className='md:ml-auto h-8 flex' onClick={() => setOpenAdd(true)}>
					<Plus className='mr-2 h-4 w-4' />
					Add unit
				</Button>
			</div>
		</div>
	)
}
