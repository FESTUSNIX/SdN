'use client'

import { Table } from '@tanstack/react-table'
import { Plus, RefreshCw, X } from 'lucide-react'

import { ViewOptions } from '@/app/components/Table/ColumnToggle'

import { Button } from '@/app/components/ui/Button'
import { Input } from '@/app/components/ui/Input'
import { useGlobalSheetContext } from '../../../context/GlobalSheetContext'
import { completionStatus, unitTypes } from '../../constants/tableData'
import { useRouter } from 'next/navigation'
import { FacetedFilter } from '@/app/components/Table/FacetedFilter'

interface DataTableToolbarProps<TData> {
	table: Table<TData>
}

export function DataTableToolbar<TData>({ table }: DataTableToolbarProps<TData>) {
	const isFiltered = table.getPreFilteredRowModel().rows.length > table.getFilteredRowModel().rows.length
	const { openSheet } = useGlobalSheetContext()

	const router = useRouter()

	return (
		<div className='wrapper flex flex-col flex-wrap gap-y-2 bg-background pb-2 pt-6 md:flex-row md:items-center'>
			<div className='flex flex-1 flex-wrap items-center gap-2'>
				<Button variant='outline' onClick={() => router.refresh()} className='h-8 px-2 lg:px-3'>
					<RefreshCw className='mr-2 h-4 w-4' />
					Refresh
				</Button>

				<Input
					placeholder='Filter units...'
					value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
					onChange={event => table.getColumn('name')?.setFilterValue(event.target.value)}
					className='h-8 w-[150px] lg:w-[250px]'
				/>
				{table.getColumn('unitType') && (
					<FacetedFilter column={table.getColumn('unitType')} title='Type' options={unitTypes} />
				)}
				{table.getColumn('status') && (
					<FacetedFilter column={table.getColumn('status')} title='Status' options={completionStatus} />
				)}

				{isFiltered && (
					<Button variant='ghost' onClick={() => table.resetColumnFilters()} className='h-8 px-2 lg:px-3'>
						Reset
						<X className='ml-2 h-4 w-4' />
					</Button>
				)}

				<ViewOptions table={table} />
				<Button
					variant='default'
					size='sm'
					className='flex h-8'
					onClick={() => {
						openSheet('ADD_UNIT')
					}}>
					<Plus className='mr-2 h-4 w-4' />
					Add unit
				</Button>
			</div>
		</div>
	)
}
