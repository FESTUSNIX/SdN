'use client'

import { SheetTypes } from '@/app/(admin)/admin/components/Sheets'
import { FilterOption } from '@/app/components/DataTable/FacetedFilter'
import {
	getCoreRowModel,
	getFacetedRowModel,
	getFacetedUniqueValues,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
	type ColumnDef,
	type ColumnFiltersState,
	type Row,
	type SortingState,
	type VisibilityState
} from '@tanstack/react-table'
import { ComponentType, ReactElement, useState } from 'react'
import { DataTableContent } from '../DataTableContent'

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[]
	data: TData[]
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

export function ClientSideDataTable<TData, TValue>({
	columns,
	data,
	filterableColumns = [],
	searchableColumns = [],
	RowActions,
	sheetType,
	buttonText,
	fixedPagination = true
}: DataTableProps<TData, TValue>) {
	const [rowSelection, setRowSelection] = useState({})
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
	const [sorting, setSorting] = useState<SortingState>([])

	const table = useReactTable({
		data,
		columns,
		state: {
			sorting,
			columnVisibility,
			rowSelection,
			columnFilters
		},
		initialState: {
			pagination: {
				pageSize: 25
			}
		},
		enableRowSelection: true,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),
		onRowSelectionChange: setRowSelection,
		onColumnFiltersChange: setColumnFilters,
		onColumnVisibilityChange: setColumnVisibility,
		getFilteredRowModel: getFilteredRowModel(),
		getFacetedRowModel: getFacetedRowModel(),
		getFacetedUniqueValues: getFacetedUniqueValues(),
		enableColumnResizing: true,
		columnResizeMode: 'onChange',
		defaultColumn: {
			minSize: 150,
			maxSize: 800
		}
	})

	return (
		<DataTableContent
			table={table}
			RowActions={RowActions}
			buttonText={buttonText}
			filterableColumns={filterableColumns}
			searchableColumns={searchableColumns}
			sheetType={sheetType}
			fixedPagination={fixedPagination}
		/>
	)
}
