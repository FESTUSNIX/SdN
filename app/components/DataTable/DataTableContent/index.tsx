'use client'

import { SheetTypes } from '@/app/(admin)/admin/components/Sheets'
import { FilterOption } from '@/app/components/DataTable/FacetedFilter'
import { Pagination } from '@/app/components/DataTable/Pagination'
import { Toolbar } from '@/app/components/DataTable/Toolbar'
import { ScrollArea } from '@/app/components/ui/scroll-area'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/app/components/ui/table'
import { cn } from '@/lib/utils'
import { flexRender, type Row, type Table as TableType } from '@tanstack/react-table'
import { ComponentType, ReactElement, useMemo } from 'react'
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
	sheetType?: SheetTypes
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
	const columnSizeVars = useMemo(() => {
		const headers = table.getFlatHeaders()
		const colSizes: { [key: string]: number } = {}
		for (let i = 0; i < headers.length; i++) {
			const header = headers[i]!
			colSizes[`--header-${header.id}-size`] = header.getSize()
			colSizes[`--col-${header.column.id}-size`] = header.column.getSize()
		}
		return colSizes
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [table.getState().columnSizingInfo, table.getState().columnSizing])

	return (
		<div className='flex h-full w-full flex-1 flex-col'>
			<Toolbar
				table={table}
				filterableColumns={filterableColumns}
				searchableColumns={searchableColumns}
				sheetType={sheetType}
				buttonText={buttonText}
			/>

			<div className='wrapper relative mt-4 h-max w-full overflow-hidden rounded-md border max-md:mb-20 md:mb-4 xl:max-w-[calc(100vw-6rem)] 2xl:max-w-[calc(100vw-8rem)]'>
				<ScrollArea className='relative h-[75vh] max-w-full md:h-full'>
					<Table
						style={{
							...columnSizeVars, //Define column sizes on the <table> element
							minWidth: table.getTotalSize()
						}}>
						<TableHeader className='sticky top-0 z-10 border-b border-border bg-background'>
							{table.getHeaderGroups().map(headerGroup => (
								<TableRow key={headerGroup.id} className='w-full bg-background'>
									{headerGroup.headers.map((header, index, headers) => {
										return (
											<TableHead
												key={header.id}
												style={{ width: `calc(var(--header-${header?.id}-size) * 1px)` }}
												className={cn(
													'relative border-r first:border-l-0 last:border-r-0',
													['workStatus'].includes(header.column.id) && '!w-0 !border-none !px-0'
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
											<TableRow data-state={row.getIsSelected() && 'selected'} className='relative odd:bg-secondary/50'>
												{row.getVisibleCells().map((cell, index, cells) => (
													<TableCell
														key={cell.id}
														className={cn(
															'border-r px-4 py-1 first:border-l-0 last:border-r-0',
															['workStatus'].includes(cell.column.id) && '!w-0 !min-w-0 !border-none !px-0'
														)}>
														<div className='max-w-full break-words'>
															{flexRender(cell.column.columnDef.cell, cell.getContext())}
														</div>
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
