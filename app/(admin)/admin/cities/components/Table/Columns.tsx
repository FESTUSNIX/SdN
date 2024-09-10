'use client'

import { ColumnHeader } from '@/app/components/DataTable/ColumnHeader'
import { Lightbox, LightboxTrigger } from '@/app/components/Lightbox'
import { PlaceholderImage } from '@/app/components/PlaceholderImage'
import { Button } from '@/app/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/app/components/ui/tooltip'
import { urlFor } from '@/lib/supabase/getUrlFor'
import { CityPayload } from '@/lib/validators/city'
import { SubscriptionTablePayload } from '@/lib/validators/subscription'
import { ColumnDef } from '@tanstack/react-table'
import { format, isAfter } from 'date-fns'
import { MoreHorizontal, Pointer } from 'lucide-react'
import Image from 'next/image'

export const columns: ColumnDef<CityPayload>[] = [
	{
		accessorKey: 'id',
		header: ({ column }) => <ColumnHeader column={column} title='#' />,
		size: 50,
		minSize: 25,
		maxSize: 25
	},
	{
		accessorKey: 'name',
		header: ({ column }) => <ColumnHeader column={column} title='Name' />
	},
	{
		id: 'voivodeship',
		accessorKey: 'voivodeship_name',
		header: ({ column }) => <ColumnHeader column={column} title='Voivodeship' />,
		cell: ({ row }) => {
			return <span>{row.original.voivodeship.name}</span>
		}
	},
	{
		accessorKey: 'description',
		header: ({ column }) => {
			return <ColumnHeader column={column} title='Description' />
		},
		cell: ({ row }) => {
			const description = row.original.description
			if (!description) return <span className='text-muted-foreground'>No description</span>

			return (
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger>
							<p className='max-w-lg truncate'>{description}</p>
						</TooltipTrigger>
						<TooltipContent className='max-w-md'>
							<div className=''>{description}</div>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			)
		},
		maxSize: 400,
		size: 300
	},
	{
		accessorKey: 'image',
		header: ({ column }) => {
			return <ColumnHeader column={column} title='Image' />
		},
		cell: ({ row }) => {
			const image = row.original.image

			if (!image) return <PlaceholderImage animated={false} iconClassName='w-4 h-4' className='h-8 w-8 rounded-sm' />

			const src = urlFor('cities', image).publicUrl
			return (
				<div>
					<Lightbox showThumbnails={false} images={[{ src: src, alt: 'City image' }]}>
						<LightboxTrigger index={0}>
							<div className='size-8 overflow-hidden rounded-sm border'>
								<Image src={src} alt='City image' width={36} height={36} className='size-full object-cover' />
							</div>
						</LightboxTrigger>
					</Lightbox>
				</div>
			)
		},
		enableSorting: false,
		size: 50,
		minSize: 25
	}
]
