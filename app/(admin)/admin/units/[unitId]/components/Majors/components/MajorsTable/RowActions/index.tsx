'use client'

import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuLabel,
	ContextMenuSeparator,
	ContextMenuTrigger
} from '@/app/components/ui/ContextMenu'
import { MajorValidatorWithFullQualifications } from '@/lib/validators/major'
import { Row } from '@tanstack/react-table'
import { ExternalLink } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import EditRow from './components/EditRow'
import UpdateStatus from './components/UpdateStatus'
import DeleteRow from '@/app/(admin)/admin/components/DeleteRow'

type Props<TData> = {
	unitId: number
	row: Row<TData>
	children: React.ReactNode
}

export function RowActions<TData>({ unitId, row, children }: Props<TData>) {
	const rowData = MajorValidatorWithFullQualifications.parse(row.original)

	return (
		<ContextMenu>
			<ContextMenuTrigger asChild>{children}</ContextMenuTrigger>
			<ContextMenuContent>
				<ContextMenuLabel>Actions</ContextMenuLabel>
				<ContextMenuSeparator />
				<ContextMenuItem asChild>
					<Link href={`admin/units/${unitId}/major/${rowData.id}`} className='flex w-full items-center' target='_blank'>
						<ExternalLink className='mr-2 h-3.5 w-3.5 text-muted-foreground/70' />
						Open page
					</Link>
				</ContextMenuItem>

				<EditRow rowData={rowData} />

				<ContextMenuSeparator />

				<UpdateStatus rowData={rowData} />

				<ContextMenuSeparator />

				<DeleteRow apiQuery={`/api/unit/major?id=${rowData.id}`} />
			</ContextMenuContent>
		</ContextMenu>
	)
}

export default RowActions
