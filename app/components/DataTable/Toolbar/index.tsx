'use client'

import { SHEET_TYPES, useGlobalSheetContext } from '@/app/(admin)/admin/context/GlobalSheetContext'
import { ViewOptions } from '@/app/components/DataTable/ColumnToggle'
import { FacetedFilter, type FilterOption } from '@/app/components/DataTable/FacetedFilter'
import RefreshTable from '@/app/components/DataTable/RefreshTable'
import { Button } from '@/app/components/ui/Button'
import { Input } from '@/app/components/ui/Input'
import type { Table } from '@tanstack/react-table'
import { Plus, X } from 'lucide-react'

interface DataTableToolbarProps<TData> {
	table: Table<TData>
	filterableColumns?: {
		id: keyof TData
		title: string
		options: FilterOption[]
	}[]
	searchableColumns?: {
		id: keyof TData
		title: string
	}[]
	sheetType?: SHEET_TYPES
	buttonText?: string
}

export function Toolbar<TData>({
	table,
	filterableColumns = [],
	searchableColumns = [],
	sheetType,
	buttonText
}: DataTableToolbarProps<TData>) {
	const { openSheet } = useGlobalSheetContext()

	const isFiltered = table.getState().columnFilters.length > 0

	return (
		<div className='wrapper flex flex-col flex-wrap gap-y-2 bg-background pb-2 pt-6 md:flex-row md:items-center'>
			<div className='flex flex-1 flex-wrap items-center gap-2'>
				<RefreshTable />

				{searchableColumns.length > 0 &&
					searchableColumns.map(
						column =>
							table.getColumn(column.id ? String(column.id) : '') && (
								<Input
									key={String(column.id)}
									placeholder={`Filter ${column.title}...`}
									value={(table.getColumn(String(column.id))?.getFilterValue() as string) ?? ''}
									onChange={event => table.getColumn(String(column.id))?.setFilterValue(event.target.value)}
									className='h-8 w-[150px] lg:w-[250px]'
								/>
							)
					)}
				{filterableColumns.length > 0 &&
					filterableColumns.map(
						column =>
							table.getColumn(column.id ? String(column.id) : '') && (
								<FacetedFilter
									key={String(column.id)}
									column={table.getColumn(column.id ? String(column.id) : '')}
									title={column.title}
									options={column.options}
								/>
							)
					)}
				{isFiltered && (
					<Button variant='ghost' onClick={() => table.resetColumnFilters()} className='h-8 px-2 lg:px-3'>
						Reset
						<X className='ml-2 h-4 w-4' />
					</Button>
				)}
				<ViewOptions table={table} />
				{sheetType && (
					<Button
						variant='default'
						size='sm'
						className='flex h-8'
						onClick={() => {
							openSheet(sheetType)
						}}>
						<Plus className='mr-2 h-4 w-4' />
						{buttonText}
					</Button>
				)}
			</div>
		</div>
	)
}
