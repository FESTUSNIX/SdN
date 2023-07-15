'use client'

import { ColumnHeader } from '@/app/components/DataTable/ColumnHeader'
import { Button } from '@/app/components/ui/Button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/app/components/ui/Tooltip'
import { QualificationPayload } from '@/lib/validators/qualification'
import { ColumnDef } from '@tanstack/react-table'
import { MoreHorizontal, Pointer } from 'lucide-react'

export const columns: ColumnDef<QualificationPayload>[] = [
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
		}
	},
	{
		accessorKey: 'type',
		header: ({ column }) => <ColumnHeader column={column} title='Type' />,
		filterFn: (row, id, value) => {
			return value instanceof Array && value.includes(row.getValue(id))
		}
	},
	{
		id: 'keywords',
		accessorKey: 'keywords',
		header: ({ column }) => <ColumnHeader column={column} title='Keywords' />,
		cell: ({ row }) => {
			const keywords = row.original.keywords

			return (
				<ul className='flex items-center'>
					{keywords?.map((keyword, index) => (
						<li key={keyword} className=''>
							{keyword}
							{index !== keywords.length - 1 && <span>,&nbsp;</span>}
						</li>
					))}
				</ul>
			)
		},
		enableSorting: false
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
