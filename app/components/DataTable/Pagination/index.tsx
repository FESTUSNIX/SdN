import { Table } from '@tanstack/react-table'
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/Select'
import { Button } from '@/app/components/ui/Button'
import { cn } from '@/lib/utils'

interface DataTablePaginationProps<TData> {
	table: Table<TData>
	fixed?: boolean
}

export function Pagination<TData>({ table, fixed = true }: DataTablePaginationProps<TData>) {
	return (
		<div
			className={cn(
				'bottom-0 left-0 mt-auto w-full border-t border-border bg-background py-4',
				fixed && 'max-md:fixed'
			)}>
			<div className='wrapper flex flex-col justify-between gap-y-4 md:flex-row md:items-center'>
				<div className='hidden flex-1 text-sm text-muted-foreground md:block'>
					{table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s)
					selected.
				</div>
				<div className='flex flex-wrap items-center gap-x-6 gap-y-2 lg:gap-x-8'>
					<div className='flex items-center'>
						<p className='hidden pr-4 text-sm font-medium md:block'>Rows per page</p>
						<Select
							value={`${table.getState().pagination.pageSize}`}
							onValueChange={value => {
								table.setPageSize(Number(value))
							}}
							defaultValue='25'>
							<SelectTrigger className='h-8 w-[70px]' aria-label='Select rows per page'>
								<SelectValue placeholder={table.getState().pagination.pageSize} />
							</SelectTrigger>
							<SelectContent side='top'>
								{[10, 25, 50, 100].map(pageSize => (
									<SelectItem key={pageSize} value={`${pageSize}`}>
										{pageSize}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
					<div className='flex items-center gap-4'>
						<div className='flex items-center justify-center text-sm font-medium'>
							Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
						</div>
						<div className='flex items-center gap-x-2'>
							<Button
								variant='outline'
								className='hidden h-8 w-8 p-0 lg:flex'
								onClick={() => table.setPageIndex(0)}
								disabled={!table.getCanPreviousPage()}>
								<span className='sr-only'>Go to first page</span>
								<ChevronsLeft className='h-4 w-4' />
							</Button>
							<Button
								variant='outline'
								className='h-8 w-8 p-0'
								onClick={() => table.previousPage()}
								disabled={!table.getCanPreviousPage()}>
								<span className='sr-only'>Go to previous page</span>
								<ChevronLeft className='h-4 w-4' />
							</Button>
							<Button
								variant='outline'
								className='h-8 w-8 p-0'
								onClick={() => table.nextPage()}
								disabled={!table.getCanNextPage()}>
								<span className='sr-only'>Go to next page</span>
								<ChevronRight className='h-4 w-4' />
							</Button>
							<Button
								variant='outline'
								className='hidden h-8 w-8 p-0 lg:flex'
								onClick={() => table.setPageIndex(table.getPageCount() - 1)}
								disabled={!table.getCanNextPage()}>
								<span className='sr-only'>Go to last page</span>
								<ChevronsRight className='h-4 w-4' />
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
