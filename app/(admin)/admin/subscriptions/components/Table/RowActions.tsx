'use client'

import DeleteRow from '@/app/(admin)/admin/components/DeleteRow'
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuLabel,
    ContextMenuSeparator,
    ContextMenuTrigger
} from '@/app/components/ui/ContextMenu'
import { SubscriptionPayload, SubscriptionTableValidator } from '@/lib/validators/subscription'
import { Row } from '@tanstack/react-table'
import { Pencil } from 'lucide-react'
import React from 'react'
import { useGlobalSheetContext } from '../../../context/GlobalSheetContext'

type Props<TData> = {
	row: Row<TData>
	children: React.ReactNode
}

export function RowActions<TData>({ row, children }: Props<TData>) {
	const { openSheet } = useGlobalSheetContext()

	const rowData = SubscriptionTableValidator.parse(row.original)

	return (
		<ContextMenu>
			<ContextMenuTrigger asChild>{children}</ContextMenuTrigger>
			<ContextMenuContent>
				<ContextMenuLabel>Actions</ContextMenuLabel>
				<ContextMenuSeparator />

				<ContextMenuItem
					onClick={() => {
						const defaultValues: SubscriptionPayload = {
							slug: rowData.slug,
							type: rowData.type,
							from: rowData.from,
							to: rowData.to,
							unitId: rowData.unit.id.toString()
						}

						openSheet('EDIT_SUBSCRIPTION', defaultValues)
					}}>
					<Pencil className='mr-2 h-3.5 w-3.5 text-muted-foreground/70' />
					Edit
				</ContextMenuItem>

				<ContextMenuSeparator />

				<DeleteRow apiQuery={`/api/subscriptions/${rowData.slug}`} />
			</ContextMenuContent>
		</ContextMenu>
	)
}

export default RowActions
