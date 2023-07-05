'use client'

import { Button } from '@/app/components/ui/Button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/app/components/ui/Tooltip'
import { cn } from '@/lib/utils/utils'
import { ColumnDef } from '@tanstack/react-table'
import Link from 'next/link'
import { unitTypes } from '../../constants/tableData'
import { TableUnitData } from '../../page'
import { ColumnHeader } from '@/app/components/Table/ColumnHeader'
import { MoreHorizontal, Pointer } from 'lucide-react'

export const columns: ColumnDef<TableUnitData>[] = [
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
		}
	},
	{
		accessorKey: 'id',
		header: ({ column }) => {
			return <ColumnHeader column={column} title='#' />
		},
		enableHiding: false
	},
	{
		accessorKey: 'name',
		header: ({ column }) => {
			return <ColumnHeader column={column} title='Name' />
		},
		cell: ({ row }) => {
			const name: string = row.getValue('name')

			return (
				<Link target='_blank' href={`/admin/units/${row.getValue('id')}`} className='font-medium'>
					{name}
				</Link>
			)
		}
	},
	{
		accessorKey: 'email',
		header: ({ column }) => <ColumnHeader column={column} title='Email' />
	},
	{
		accessorKey: 'city.name',
		header: ({ column }) => <ColumnHeader column={column} title='City' />
	},
	{
		accessorKey: 'unitType',
		header: ({ column }) => <ColumnHeader column={column} title='Type' />,
		cell: ({ row }) => {
			const type = unitTypes.find(type => {
				if (type.value === 'inna' && !['uczelnia', 'pdn'].includes(row.getValue('unitType'))) {
					return true
				}

				return type.value === row.getValue('unitType')
			})

			if (!type) {
				return null
			}

			return <div className='max-w-[14ch] truncate first-letter:uppercase'>{row.getValue('unitType')}</div>
		},
		enableSorting: false,
		filterFn: (row, id, value) => {
			if (value.includes('inna') && !['uczelnia', 'pdn'].includes(row.getValue(id))) {
				return true
			}

			return value.includes(row.getValue(id))
		}
	},
	{
		accessorKey: 'website',
		header: () => <div className='text-right'>Website</div>,
		cell: ({ row }) => {
			const website: string = row.getValue('website')

			return (
				<TooltipProvider>
					<Tooltip>
						<div className='flex w-full justify-end'>
							<TooltipTrigger>
								{website ? (
									<Button variant='secondary' asChild>
										<Link href={website} target='_blank' rel='noopener' className='w-fit'>
											URL
										</Link>
									</Button>
								) : (
									<p>NULL</p>
								)}
							</TooltipTrigger>
						</div>
						<TooltipContent>
							<p>{website}</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
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
		}
	}
]
