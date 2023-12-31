'use client'

import { ColumnHeader } from '@/app/components/DataTable/ColumnHeader'
import { Button } from '@/app/components/ui/Button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/app/components/ui/Tooltip'
import { cn } from '@/lib/utils/utils'
import { MajorTablePayload } from '@/lib/validators/major'
import { ColumnDef } from '@tanstack/react-table'
import { MoreHorizontal, Pointer } from 'lucide-react'
import Link from 'next/link'
import UnitCell from './UnitCell'

export const columns: ColumnDef<MajorTablePayload>[] = [
	{
		id: 'status',
		accessorKey: 'status',
		header: ' ',
		cell: ({ row }) => {
			const status = row.getValue('status')

			return (
				<span
					className={cn(
						'absolute left-0 top-0 h-full w-1.5',
						status === 'FINISHED'
							? 'bg-emerald-400/20'
							: status === 'IN_PROGRESS'
							? 'bg-orange-400/20'
							: status === 'TO_CHECK'
							? 'bg-purple-400/20'
							: ''
					)}
				/>
			)
		},
		filterFn: (row, id, value) => {
			return value.includes(row.getValue(id))
		},
		enableResizing: false,
		size: 0
	},
	{
		accessorKey: 'id',
		header: ({ column }) => {
			return <ColumnHeader column={column} title='#' />
		},
		enableHiding: false,
		size: 20
	},
	{
		accessorKey: 'name',
		header: ({ column }) => {
			return <ColumnHeader column={column} title='Name' />
		},
		cell: ({ row }) => {
			const rowData = row.original

			return (
				<Link target='_blank' href={`/admin/units/${rowData.unitId}/majors/${rowData.id}`} className='font-medium'>
					{rowData.name}
				</Link>
			)
		},
		size: 250
	},
	{
		accessorKey: 'majorLevel',
		header: ({ column }) => <ColumnHeader column={column} title='Level' />
	},
	{
		id: 'qualifications',
		accessorKey: 'qualifications_name',
		header: ({ column }) => <ColumnHeader column={column} title='Qualifications' />,
		cell: ({ row }) => {
			const qualifications = row.original.qualifications

			return (
				<ul className='flex'>
					{qualifications?.map((q, index) => (
						<li key={q.id} className='first-letter:uppercase'>
							{q.name}
							{index !== qualifications.length - 1 && <span>,&nbsp;</span>}
						</li>
					))}
				</ul>
			)
		},
		enableSorting: false,
		filterFn: (row, id, value: number[]) => {
			const qualifications = row.original.qualifications.map(q => q.id)

			return value.some(r => qualifications.includes(r))
		}
	},
	{
		accessorKey: 'unitId',
		header: ({ column }) => (
			<div className='flex justify-end'>
				<ColumnHeader column={column} title='Unit' />
			</div>
		),
		cell: ({ row }) => {
			return <UnitCell unitId={row.original.unitId} />
		}
	},
	{
		id: 'actions',
		cell: ({ row }) => {
			return (
				<TooltipProvider>
					<Tooltip delayDuration={300}>
						<div className='flex  justify-end'>
							<TooltipTrigger asChild>
								<Button variant='ghost' className='h-8 w-8 p-0'>
									<span className='sr-only'>Open menu</span>
									<MoreHorizontal className='h-4 w-4' />
								</Button>
							</TooltipTrigger>
						</div>
						<TooltipContent className='flex items-center'>
							<Pointer className='mr-2 h-3.5 w-3.5 text-muted-foreground/70' />
							Right Click
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			)
		},
		size: 0
	}
]
