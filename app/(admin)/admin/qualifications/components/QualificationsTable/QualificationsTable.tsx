'use client'

import {
	flexRender,
	getCoreRowModel,
	getFacetedRowModel,
	getFacetedUniqueValues,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
	type ColumnDef,
	type ColumnFiltersState,
	type PaginationState,
	type SortingState,
	type VisibilityState
} from '@tanstack/react-table'
import { FilterOption } from '@/app/components/DataTable/FacetedFilter'
import { Pagination } from '@/app/components/DataTable/Pagination'
import { ScrollArea } from '@/app/components/ui/ScrollArea'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/app/components/ui/Table'
import { useDebounce } from '@/app/hooks/useDebounce'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useMemo, useState } from 'react'
import RowActions from './RowActions'
import { Toolbar } from '@/app/components/DataTable/Toolbar'

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[]
	data: TData[]
	pageCount: number
	filterableColumns?: {
		id: keyof TData
		title: string
		options: FilterOption[]
	}[]
	searchableColumns?: {
		id: keyof TData
		title: string
	}[]
}

export function QualificationsTable<TData, TValue>({
	columns,
	data,
	filterableColumns = [],
	searchableColumns = [],
	pageCount
}: DataTableProps<TData, TValue>) {
	const router = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()

	// Search params
	const page = searchParams?.get('page') ?? '1'
	const per_page = searchParams?.get('per_page') ?? '10'
	const sort = searchParams?.get('sort')
	const [column, order] = sort?.split('.') ?? []

	// Create query string
	const createQueryString = useCallback(
		(params: Record<string, string | number | null>) => {
			const newSearchParams = new URLSearchParams(searchParams?.toString())

			for (const [key, value] of Object.entries(params)) {
				if (value === null) {
					newSearchParams.delete(key)
				} else {
					newSearchParams.set(key, String(value))
				}
			}

			return newSearchParams.toString()
		},
		[searchParams]
	)

	const [rowSelection, setRowSelection] = useState({})
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

	// Handle server-side pagination
	const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
		pageIndex: Number(page) - 1,
		pageSize: Number(per_page)
	})

	const pagination = useMemo(
		() => ({
			pageIndex,
			pageSize
		}),
		[pageIndex, pageSize]
	)

	useEffect(() => {
		setPagination({
			pageIndex: Number(page) - 1,
			pageSize: Number(per_page)
		})
	}, [page, per_page])

	useEffect(() => {
		router.push(
			`${pathname}?${createQueryString({
				page: pageIndex + 1,
				per_page: pageSize
			})}`
		)

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pageIndex, pageSize])

	// Handle server-side sorting
	const [sorting, setSorting] = useState<SortingState>([
		{
			id: column ?? '',
			desc: order === 'desc'
		}
	])

	useEffect(() => {
		router.push(
			`${pathname}?${createQueryString({
				page,
				sort: sorting[0]?.id ? `${sorting[0]?.id}.${sorting[0]?.desc ? 'desc' : 'asc'}` : null
			})}`
		)

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [sorting])

	// Handle server-side filtering
	const debouncedSearchableColumnFilters = JSON.parse(
		useDebounce(
			JSON.stringify(
				columnFilters.filter(filter => {
					return searchableColumns.find(column => column.id === filter.id)
				})
			),
			500
		)
	) as ColumnFiltersState

	const filterableColumnFilters = columnFilters.filter(filter => {
		return filterableColumns.find(column => column.id === filter.id)
	})

	useEffect(() => {
		for (const column of debouncedSearchableColumnFilters) {
			if (typeof column.value === 'string') {
				router.push(
					`${pathname}?${createQueryString({
						page: 1,
						[column.id]: typeof column.value === 'string' ? column.value : null
					})}`
				)
			}
		}

		for (const key of searchParams.keys()) {
			if (
				searchableColumns.find(column => column.id === key) &&
				!debouncedSearchableColumnFilters.find(column => column.id === key)
			) {
				router.push(
					`${pathname}?${createQueryString({
						page: 1,
						[key]: null
					})}`
				)
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [JSON.stringify(debouncedSearchableColumnFilters)])

	useEffect(() => {
		for (const column of filterableColumnFilters) {
			if (typeof column.value === 'object' && Array.isArray(column.value)) {
				router.push(
					`${pathname}?${createQueryString({
						page: 1,
						[column.id]: column.value.join('.')
					})}`
				)
			}
		}

		for (const key of searchParams.keys()) {
			if (
				filterableColumns.find(column => column.id === key) &&
				!filterableColumnFilters.find(column => column.id === key)
			) {
				router.push(
					`${pathname}?${createQueryString({
						page: 1,
						[key]: null
					})}`
				)
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [JSON.stringify(filterableColumnFilters)])

	const table = useReactTable({
		data,
		columns,
		pageCount: pageCount ?? -1,
		state: {
			pagination,
			sorting,
			columnVisibility,
			rowSelection,
			columnFilters
		},
		enableRowSelection: true,
		onRowSelectionChange: setRowSelection,
		onPaginationChange: setPagination,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		onColumnVisibilityChange: setColumnVisibility,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFacetedRowModel: getFacetedRowModel(),
		getFacetedUniqueValues: getFacetedUniqueValues(),
		manualPagination: true,
		manualSorting: true,
		manualFiltering: true
	})

	return (
		<div className='flex h-full w-full flex-1 flex-col'>
			<Toolbar
				table={table}
				filterableColumns={filterableColumns}
				searchableColumns={searchableColumns}
				sheetType='ADD_QUALIFICATION'
				buttonText='Add Qualification'
			/>

			<div className='wrapper relative mt-4 h-max overflow-hidden rounded-md border max-md:mb-20 md:mb-4'>
				<ScrollArea className='relative h-[75vh] max-w-full md:h-full'>
					<Table>
						<TableHeader className='sticky top-0 z-10 border-b border-border bg-background'>
							{table.getHeaderGroups().map(headerGroup => (
								<TableRow key={headerGroup.id} className='w-full'>
									{headerGroup.headers.map((header, index, headers) => {
										return (
											<TableHead key={header.id}>
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
													<TableCell key={cell.id}>
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
