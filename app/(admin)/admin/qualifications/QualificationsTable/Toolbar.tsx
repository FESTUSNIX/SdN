'use client'

import { useGlobalSheetContext } from '@/app/(admin)/admin/context/GlobalSheetContext'
import { ViewOptions } from '@/app/components/Table/ColumnToggle'
import { FacetedFilter } from '@/app/components/Table/FacetedFilter'
import { Button } from '@/app/components/ui/Button'
import { Input } from '@/app/components/ui/Input'
import { QualificationType } from '@prisma/client'
import { Table } from '@tanstack/react-table'
import { Plus, RefreshCw, X } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface DataTableToolbarProps<TData> {
	table: Table<TData>
	disableAdd?: boolean
}

export function Toolbar<TData>({ table, disableAdd = false }: DataTableToolbarProps<TData>) {
	const { openSheet } = useGlobalSheetContext()

	const isFiltered = table.getPreFilteredRowModel().rows.length > table.getFilteredRowModel().rows.length

	const router = useRouter()

	const typeOptions = [
		...Object.values(QualificationType).map(type => {
			const lowerCaseType = type.toLowerCase()
			const label = lowerCaseType.charAt(0).toUpperCase() + lowerCaseType.slice(1)

			return { label: label, value: type }
		})
	]

	return (
		<div className='wrapper flex flex-col flex-wrap gap-y-2 bg-background pb-2 pt-6 md:flex-row md:items-center'>
			<div className='flex flex-1 flex-wrap items-center gap-2'>
				<Button variant='outline' onClick={() => router.refresh()} className='h-8 px-2 lg:px-3'>
					<RefreshCw className='mr-2 h-4 w-4' />
					Refresh
				</Button>

				<Input
					placeholder='Filter qualifications...'
					value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
					onChange={event => table.getColumn('name')?.setFilterValue(event.target.value)}
					className='h-8 w-[150px] lg:w-[250px]'
				/>
				{table.getColumn('type') && (
					<FacetedFilter column={table.getColumn('type')} title='Types' options={typeOptions} />
				)}

				{isFiltered && (
					<Button variant='ghost' onClick={() => table.resetColumnFilters()} className='h-8 px-2 lg:px-3'>
						Reset
						<X className='ml-2 h-4 w-4' />
					</Button>
				)}

				<ViewOptions table={table} />
				{!disableAdd && (
					<Button
						variant='default'
						size='sm'
						className='flex h-8'
						onClick={() => {
							// Open ADD_QUALIFICATION sheet
							// openSheet('ADD_QUALIFICATION')
						}}>
						<Plus className='mr-2 h-4 w-4' />
						Add qualification
					</Button>
				)}
			</div>
		</div>
	)
}
