'use client'

import { ColumnHeader } from '@/app/components/DataTable/ColumnHeader'
import { Button, buttonVariants } from '@/app/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/app/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { MajorPayloadWithFullQualifications } from '@/lib/validators/major'
import { ColumnDef } from '@tanstack/react-table'
import { MoreHorizontal, Pointer } from 'lucide-react'
import Link from 'next/link'

export const columns: ColumnDef<
	Pick<
		MajorPayloadWithFullQualifications,
		'id' | 'name' | 'majorLevel' | 'workStatus' | 'qualifications' | 'unitId' | 'url'
	>
>[] = [
	{
		id: 'workStatus',
		accessorKey: 'workStatus',
		header: ' ',
		cell: ({ row }) => {
			const workStatus = row.getValue('workStatus')

			return (
				<span
					className={cn(
						'absolute left-0 top-0 h-full w-1.5',
						workStatus === 'FINISHED'
							? 'bg-emerald-400/20'
							: workStatus === 'IN_PROGRESS'
							? 'bg-orange-400/20'
							: workStatus === 'TO_CHECK'
							? 'bg-purple-400/20'
							: ''
					)}
				/>
			)
		},
		filterFn: (row, id, value) => {
			return value.includes(row.getValue(id))
		}
	},
	{
		accessorKey: 'id',
		header: ({ column }) => {
			return <ColumnHeader column={column} title='#' />
		},
		enableHiding: false,
		size: 20,
		minSize: 20,
		enableResizing: false
	},
	{
		accessorKey: 'name',
		header: ({ column }) => {
			return <ColumnHeader column={column} title='Name' />
		},
		cell: ({ row }) => {
			const rowData = row.original

			return (
				<Link target='_black' href={`/admin/units/${rowData.unitId}/majors/${rowData.id}`} className='font-medium'>
					{rowData.name}
				</Link>
			)
		},
		size: 300
	},
	{
		id: 'qualifications',
		accessorKey: 'qualifications_name',
		header: () => <div className=''>Qualifications</div>,
		filterFn: (row, id, value: number[]) => {
			const qualifications = row.original.qualifications.map(q => q.id)

			return value.some(r => qualifications.includes(r))
		},
		cell: ({ row }) => {
			const qualifications = row.original.qualifications

			return (
				<ul className='flex flex-wrap'>
					{qualifications?.map((q, index) => (
						<li key={q.id} className='inline-block first-letter:uppercase'>
							{q.name}
							{index !== qualifications.length - 1 && <span>,&nbsp;</span>}
						</li>
					))}
				</ul>
			)
		},
		minSize: 300
	},
	{
		accessorKey: 'majorLevel',
		header: ({ column }) => <ColumnHeader column={column} title='Level' />
	},
	{
		accessorKey: 'url',
		header: ({ column }) => <ColumnHeader column={column} title='URL' />,
		cell: ({ row }) => {
			const url = row.original.url

			if (!url) return <span className='text-muted-foreground'>No data</span>

			return (
				<Link
					href={url ?? ''}
					target='_blank'
					rel='noopener noreferrer'
					className={cn(buttonVariants({ variant: 'link' }), 'flex min-w-max')}>
					{url}
				</Link>
			)
		}
	},
	{
		id: 'actions',
		cell: ({ row }) => {
			return (
				<TooltipProvider>
					<Tooltip delayDuration={300}>
						<div className='flex w-full justify-end'>
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
