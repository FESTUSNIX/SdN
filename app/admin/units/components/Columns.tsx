'use client'

import { Button } from '@/app/components/ui/Button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/app/components/ui/Tooltip'
import { cn } from '@/lib/utils/utils'
import { ColumnDef } from '@tanstack/react-table'
import Link from 'next/link'
import { unitTypes } from '../constants/tableData'
import { TableUnitData } from '../page'
import { DataTableColumnHeader } from './DataTableColumnHeader'
import RowActions from './RowActions'

export const columns: ColumnDef<TableUnitData>[] = [
	{
		accessorKey: 'id',
		header: ({ column }) => {
			return <div>#</div>
		},
		enableSorting: false,
		enableHiding: false
	},
	{
		accessorKey: 'name',
		header: ({ column }) => {
			return <DataTableColumnHeader column={column} title='Name' />
		},
		cell: ({ row }) => {
			const name: string = row.getValue('name')

			return (
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger>
							<div className='max-w-xs truncate font-medium'>{name}</div>
						</TooltipTrigger>
						<TooltipContent>
							<p>{name}</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			)
		}
	},
	{
		accessorKey: 'email',
		header: ({ column }) => <DataTableColumnHeader column={column} title='Email' />
	},
	{
		accessorKey: 'city.name',
		header: ({ column }) => <DataTableColumnHeader column={column} title='City' />
	},
	{
		accessorKey: 'unitType',
		header: ({ column }) => <DataTableColumnHeader column={column} title='Type' />,
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

			return <div className='first-letter:uppercase max-w-[14ch] truncate'>{row.getValue('unitType')}</div>
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
						<div className='w-full flex justify-end'>
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
			return <RowActions row={row} />
		}
	},
	{
		id: 'status',
		accessorKey: 'status',
		header: ' ',
		cell: ({ row }) => {
			const status = row.getValue('status')

			return (
				<span
					className={cn(
						'h-full absolute w-1 top-0 right-0',
						status === 'FINISHED' ? 'bg-emerald-400/20' : 'bg-orange-400/20'
					)}
				/>
			)
		},
		filterFn: (row, id, value) => {
			return value.includes(row.getValue(id))
		}
	}
]
