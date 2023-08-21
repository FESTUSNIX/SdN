'use client'

import DeleteRow from '@/app/(admin)/admin/components/DeleteRow'
import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuLabel,
	ContextMenuSeparator,
	ContextMenuTrigger
} from '@/app/components/ui/ContextMenu'
import { QualificationValidator } from '@/lib/validators/qualification'
import { Row } from '@tanstack/react-table'
import React from 'react'
import EditRow from './components/EditRow'

type Props<TData> = {
	row: Row<TData>
	children: React.ReactNode
}

export function RowActions<TData>({ row, children }: Props<TData>) {
	const rowData = QualificationValidator.parse(row.original)

	return (
		<ContextMenu>
			<ContextMenuTrigger asChild>{children}</ContextMenuTrigger>
			<ContextMenuContent>
				<ContextMenuLabel>Actions</ContextMenuLabel>
				<ContextMenuSeparator />

				<EditRow rowData={rowData} />

				<ContextMenuSeparator />

				<DeleteRow apiQuery={`/api/majors/${rowData.id}`} />
			</ContextMenuContent>
		</ContextMenu>
	)
}

export default RowActions
