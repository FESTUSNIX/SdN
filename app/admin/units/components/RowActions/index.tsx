'use client'

import { Button } from '@/app/components/ui/Button'
import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuLabel,
	ContextMenuSeparator,
	ContextMenuTrigger
} from '@/app/components/ui/ContextMenu'
import { UnitTableValidator } from '@/lib/validators/unit'
import { Row } from '@tanstack/react-table'
import { ExternalLink, MoreHorizontal } from 'lucide-react'
import Link from 'next/link'
import DeleteRow from './components/DeleteRow'
import EditRow from './components/EditRow'
import UpdateStatus from './components/UpdateStatus'
import React, { useState } from 'react'

type Props<TData> = {
	row: Row<TData>
	children: React.ReactNode
}

export function RowActions<TData>({ row, children }: Props<TData>) {
	const rowData = UnitTableValidator.parse(row.original)

	return (
		<ContextMenu>
			<ContextMenuTrigger asChild>{children}</ContextMenuTrigger>
			<ContextMenuContent>
				<ContextMenuLabel>Actions</ContextMenuLabel>
				<ContextMenuSeparator />
				<ContextMenuItem>
					<Link href={`/units/${rowData.id}`} className='flex w-full items-center' target='_blank'>
						<ExternalLink className='mr-2 h-3.5 w-3.5 text-muted-foreground/70' />
						Open page
					</Link>
				</ContextMenuItem>

				<EditRow rowData={rowData} />

				<ContextMenuSeparator />

				<UpdateStatus rowData={rowData} />

				<ContextMenuSeparator />

				<DeleteRow rowData={rowData} />
			</ContextMenuContent>
		</ContextMenu>
	)
}

export default RowActions
