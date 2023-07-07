'use client'

import { useGlobalSheetContext } from '@/app/(admin)/admin/context/GlobalSheetContext'
import { ViewOptions } from '@/app/components/Table/ColumnToggle'
import { Button } from '@/app/components/ui/Button'
import { Input } from '@/app/components/ui/Input'
import { useQuery } from '@tanstack/react-query'
import { Table } from '@tanstack/react-table'
import axios from 'axios'
import { Plus, X } from 'lucide-react'
import { completionStatus } from '../../../../../constants/tableData'
import { FacetedFilter } from './FacetedFilter'

interface DataTableToolbarProps<TData> {
	table: Table<TData>
}

export function Toolbar<TData>({ table }: DataTableToolbarProps<TData>) {
	const { openSheet } = useGlobalSheetContext()

	const isFiltered = table.getPreFilteredRowModel().rows.length > table.getFilteredRowModel().rows.length

	const { data: qualifications } = useQuery({
		queryKey: ['qualifications'],
		queryFn: async () => {
			const { data } = await axios.get('/api/qualifications')

			return data
		}
	})

	const qualificationsOptions = qualifications?.map((qualification: any) => ({
		label: qualification.name,
		value: qualification.id
	}))

	return (
		<div className='flex flex-col flex-wrap gap-y-2 bg-background pb-2 pt-6 md:flex-row md:items-center'>
			<div className='flex flex-1 flex-wrap items-center gap-2'>
				<Input
					placeholder='Filter majors...'
					value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
					onChange={event => table.getColumn('name')?.setFilterValue(event.target.value)}
					className='h-8 w-[150px] lg:w-[250px]'
				/>
				{table.getColumn('qualifications') && (
					<FacetedFilter
						column={table.getColumn('qualifications')}
						title='Qualifications'
						options={qualificationsOptions}
					/>
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
						openSheet('ADD_MAJOR')
					}}>
					<Plus className='mr-2 h-4 w-4' />
					Add major
				</Button>
			</div>
		</div>
	)
}
