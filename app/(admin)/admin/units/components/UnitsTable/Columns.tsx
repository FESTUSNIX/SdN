'use client'

import { ColumnHeader } from '@/app/components/DataTable/ColumnHeader'
import { Button, buttonVariants } from '@/app/components/ui/Button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/app/components/ui/Tooltip'
import { cn, placeholderImage } from '@/lib/utils'
import { TableUnitData } from '@/lib/validators/unit'
import { type ColumnDef } from '@tanstack/react-table'
import { MoreHorizontal, Pointer } from 'lucide-react'
import Link from 'next/link'
import { UNIT_TYPE_OPTIONS } from '../../../constants/unitTypesOptions'
import Image from 'next/image'
import { urlFor } from '@/lib/supabase/getUrlFor'
import { Lightbox, LightboxTrigger } from '@/app/components/Lightbox'

export const columns: ColumnDef<TableUnitData>[] = [
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
			return value instanceof Array && value.includes(row.getValue(id))
		}
	},
	{
		accessorKey: 'id',
		header: ({ column }) => {
			return <ColumnHeader column={column} title='#' />
		},
		enableHiding: false,
		size: 10,
		minSize: 10
	},
	{
		accessorKey: 'logo',
		header: ({ column }) => {
			return <ColumnHeader column={column} title='Logo' />
		},
		cell: ({ row }) => {
			const logo = row.original.logo

			const src = logo ? urlFor('units', logo).publicUrl : placeholderImage

			return (
				<div>
					<Lightbox showThumbnails={false} images={[{ src: src, alt: 'Logo' }]}>
						<LightboxTrigger index={0}>
							<div className='size-8 overflow-hidden rounded-sm border'>
								<Image
									src={logo ? urlFor('units', logo).publicUrl : placeholderImage}
									alt='Logo'
									width={36}
									height={36}
									className='size-full object-cover'
								/>
							</div>
						</LightboxTrigger>
					</Lightbox>
				</div>
			)
		},
		enableSorting: false,
		size: 50,
		minSize: 25
	},
	{
		accessorKey: 'name',
		header: ({ column }) => {
			return <ColumnHeader column={column} title='Name' />
		},
		cell: ({ row }) => {
			const name: string = row.getValue('name')

			return (
				<Link target='_blank' href={`/admin/units/${row.getValue('id')}`} className='min-w-full font-medium'>
					{name}
				</Link>
			)
		},
		size: 500
	},
	{
		accessorKey: 'email',
		header: ({ column }) => <ColumnHeader column={column} title='Email' />,
		cell: ({ row }) => {
			const email: string = row.getValue('email')

			return <div className='break-all'>{email}</div>
		},
		minSize: 100,
		size: 300
	},
	{
		accessorKey: 'city.name',
		header: ({ column }) => <ColumnHeader column={column} title='City' />,
		size: 200
	},
	{
		accessorKey: 'unitType',
		header: ({ column }) => <ColumnHeader column={column} title='Type' />,
		cell: ({ row }) => {
			const type = UNIT_TYPE_OPTIONS.find(type => {
				if (type.value === 'inna' && !['uczelnia', 'pdn'].includes(row.getValue('unitType'))) {
					return true
				}

				return type.value === row.getValue('unitType')
			})

			if (!type) {
				return null
			}

			return <div className='first-letter:uppercase'>{row.getValue('unitType')}</div>
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
		accessorKey: '_count.majors',
		header: ({ column }) => <ColumnHeader column={column} title='Majors' />,
		cell: ({ row }) => {
			const majorsCount: string = row.getValue('_count_majors')

			return <div className=''>{majorsCount}</div>
		},
		size: 20,
		minSize: 20
	},
	{
		accessorKey: 'website',
		header: ({ column }) => <ColumnHeader column={column} title='Website' />,
		cell: ({ row }) => {
			const website = row.original.website

			if (!website) return <span className='text-muted-foreground'>No data</span>

			return (
				<Link
					href={website ?? ''}
					target='_blank'
					rel='noopener noreferrer'
					className={cn(buttonVariants({ variant: 'link' }), 'text-start')}>
					{website}
				</Link>
			)
		}
	},
	{
		accessorKey: 'subscriptions',
		header: ({ column }) => {
			return <ColumnHeader column={column} title='Subscription' />
		},
		cell: ({ row }) => {
			return (
				<p>
					{row.original.subscriptions.length > 0
						? row.original.subscriptions?.map((subscription: any) => subscription.type).join(', ')
						: 'NULL'}
				</p>
			)
		}
	},
	{
		accessorKey: 'slug',
		header: ({ column }) => {
			return <ColumnHeader column={column} title='Slug' />
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
