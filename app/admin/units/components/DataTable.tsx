'use client'

import {
	ColumnDef,
	ColumnFiltersState,
	SortingState,
	VisibilityState,
	flexRender,
	getCoreRowModel,
	getFacetedRowModel,
	getFacetedUniqueValues,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable
} from '@tanstack/react-table'

import { ScrollArea } from '@/app/components/ui/ScrollArea'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/app/components/ui/Table'
import { cn } from '@/lib/utils/utils'
import { useState } from 'react'
import { DataTableToolbar } from './DataTableToolbar'
import { Pagination } from './Pagination'
import RowActions from './RowActions'

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[]
	data: TData[]
}

export function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
	const [rowSelection, setRowSelection] = useState({})
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
	const [sorting, setSorting] = useState<SortingState>([
		{
			id: 'id',
			desc: false
		}
	])

	const table = useReactTable({
		data,
		columns,
		state: {
			sorting,
			columnVisibility,
			rowSelection,
			columnFilters
		},
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),
		enableRowSelection: true,
		onRowSelectionChange: setRowSelection,
		onColumnFiltersChange: setColumnFilters,
		onColumnVisibilityChange: setColumnVisibility,
		getFilteredRowModel: getFilteredRowModel(),
		getFacetedRowModel: getFacetedRowModel(),
		getFacetedUniqueValues: getFacetedUniqueValues()
	})

	return (
		<div className='flex h-full w-full flex-1 flex-col'>
			<DataTableToolbar table={table} />

			<div className='wrapper relative mb-6 mt-4 h-max overflow-hidden rounded-md border'>
				<ScrollArea className='relative h-[75vh] max-w-full md:h-full'>
					<Table>
						<TableHeader className='sticky top-0 z-10 border-b border-border bg-background'>
							{table.getHeaderGroups().map(headerGroup => (
								<TableRow key={headerGroup.id} className='w-full'>
									{headerGroup.headers.map((header, index, headers) => {
										return (
											<TableHead key={header.id} className={cn(index === 0 && 'w-0 p-0')}>
												{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
											</TableHead>
										)
									})}
								</TableRow>
							))}
						</TableHeader>
						<TableBody>
							{table.getRowModel().rows?.length ? (
								table.getRowModel().rows.map(row => {
									return (
										<RowActions key={row.id} row={row}>
											<TableRow data-state={row.getIsSelected() && 'selected'} className='relative'>
												{row.getVisibleCells().map((cell, index, cells) => (
													<TableCell key={cell.id} className={cn('relative', index === 0 && 'w-0 p-0')}>
														{flexRender(cell.column.columnDef.cell, cell.getContext())}
													</TableCell>
												))}
											</TableRow>
										</RowActions>
									)
								})
							) : (
								<TableRow>
									<TableCell colSpan={columns.length} className='h-24 text-center'>
										No results.
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>
				</ScrollArea>
			</div>

			<Pagination table={table} />
		</div>
	)
}
