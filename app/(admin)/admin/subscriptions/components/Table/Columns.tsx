'use client'

import { ColumnHeader } from '@/app/components/DataTable/ColumnHeader'
import { Button } from '@/app/components/ui/Button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/app/components/ui/Tooltip'
import { SubscriptionTablePayload } from '@/lib/validators/subscription'
import { ColumnDef } from '@tanstack/react-table'
import { format, isAfter } from 'date-fns'
import { MoreHorizontal, Pointer } from 'lucide-react'

export const columns: ColumnDef<SubscriptionTablePayload>[] = [
	{
		accessorKey: 'slug',
		header: ({ column }) => {
			return <ColumnHeader column={column} title='#' />
		}
	},
	{
		id: 'unit',
		accessorKey: 'unit_name',
		header: ({ column }) => {
			return <ColumnHeader column={column} title='Unit' />
		},
		cell: ({ row }) => {
			return <span>{row.original.unit.name}</span>
		},
		filterFn: (rows, id, filterValue) => {
			return rows.original.unit.name.toLowerCase().includes(filterValue.toLowerCase())
		},
		sortingFn: (a, b) => {
			return a.original.unit.name.localeCompare(b.original.unit.name)
		}
	},
	{
		accessorKey: 'type',
		header: ({ column }) => {
			return <ColumnHeader column={column} title='Type' />
		}
	},
	{
		accessorKey: 'from',
		header: ({ column }) => {
			return <ColumnHeader column={column} title='From' />
		},
		cell: ({ row }) => {
			return <span>{format(new Date(row.original.from), 'dd/MM/yyyy')}</span>
		}
	},
	{
		accessorKey: 'to',
		header: ({ column }) => {
			return <ColumnHeader column={column} title='To' />
		},
		cell: ({ row }) => {
			return <span>{row.original.to ? format(new Date(row.original.to), 'dd/MM/yyyy') : 'NULL'}</span>
		},
		filterFn: (rows, id, filterValue) => {
			if (!rows.original.to) return filterValue.includes('active')

			const currentDate = new Date(rows.original.to)
			const today = new Date()
			const isActive = isAfter(currentDate, today)

			if (isActive) return filterValue.includes('active')

			return filterValue.includes('inactive')
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
