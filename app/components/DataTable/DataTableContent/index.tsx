'use client'

import { SHEET_TYPES } from '@/app/(admin)/admin/context/GlobalSheetContext'
import { FilterOption } from '@/app/components/DataTable/FacetedFilter'
import { Pagination } from '@/app/components/DataTable/Pagination'
import { Toolbar } from '@/app/components/DataTable/Toolbar'
import { ScrollArea } from '@/app/components/ui/ScrollArea'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/app/components/ui/Table'
import { cn } from '@/lib/utils/utils'
import { flexRender, type Row, type Table as TableType } from '@tanstack/react-table'
import { ComponentType, ReactElement } from 'react'
import { ConditionalWrapper } from '../../ConditionalWrapper'

type PropsTable<TData> = {
	table: TableType<TData>
	filterableColumns?: {
		id: keyof TData
		title: string
		options: FilterOption[]
	}[]
	searchableColumns?: {
		id: keyof TData
		title: string
	}[]
	RowActions?: ComponentType<{
		row: Row<TData>
		children: ReactElement
	}>
	sheetType?: SHEET_TYPES
	buttonText?: string
	fixedPagination?: boolean
}

export function DataTableContent<TData>({
	table,
	RowActions,
	buttonText,
	filterableColumns,
	fixedPagination,
	searchableColumns,
	sheetType
}: PropsTable<TData>) {
	return (
		<div className='flex h-full w-full flex-1 flex-col'>
			<Toolbar
				table={table}
				filterableColumns={filterableColumns}
				searchableColumns={searchableColumns}
				sheetType={sheetType}
				buttonText={buttonText}
			/>

			<div className='wrapper relative mt-4 h-max overflow-hidden rounded-md border max-md:mb-20 md:mb-4'>
				<ScrollArea className='relative h-[75vh] max-w-full md:h-full'>
					<Table>
						<TableHeader className='sticky top-0 z-10 border-b border-border bg-background'>
							{table.getHeaderGroups().map(headerGroup => (
								<TableRow key={headerGroup.id} className='w-full bg-background'>
									{headerGroup.headers.map((header, index, headers) => {
										return (
											<TableHead
												key={header.id}
												style={{ width: header.getSize() }}
												className={cn(
													'relative border-r first:border-l-0 last:border-r-0',
													['status'].includes(header.column.id) && '!w-0 !border-none !px-0'
												)}>
												{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
												{header.column.getCanResize() && (
													<div
														onMouseDown={header.getResizeHandler()}
														onTouchStart={header.getResizeHandler()}
														className={`absolute right-0 top-0 h-full w-1 cursor-col-resize touch-none select-none bg-border opacity-0 duration-300 ${
															header.column.getIsResizing() ? 'bg-primary opacity-100' : ''
														}`}></div>
												)}
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
										<ConditionalWrapper
											key={row.id}
											condition={!!RowActions}
											wrapper={children => RowActions && <RowActions row={row}>{children}</RowActions>}>
											<TableRow data-state={row.getIsSelected() && 'selected'} className='relative'>
												{row.getVisibleCells().map((cell, index, cells) => (
													<TableCell
														key={cell.id}
														style={{ width: cell.column.getSize() }}
														className={cn(
															'border-r px-4 py-1 first:border-l-0 last:border-r-0',
															['status'].includes(cell.column.id) && '!w-0 !border-none !px-0'
														)}>
														{flexRender(cell.column.columnDef.cell, cell.getContext())}
													</TableCell>
												))}
											</TableRow>
										</ConditionalWrapper>
									)
								})
							) : (
								<TableRow>
									<TableCell colSpan={table.getAllColumns().length} className='h-24 w-full text-center'>
										No results.
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>
				</ScrollArea>
			</div>

			<Pagination table={table} fixed={fixedPagination} />
		</div>
	)
}
