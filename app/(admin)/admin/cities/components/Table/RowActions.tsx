'use client'

import DeleteRow from '@/app/(admin)/admin/components/DeleteRow'
import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuLabel,
	ContextMenuSeparator,
	ContextMenuTrigger
} from '@/app/components/ui/context-menu'
import { CityValidator, CityPayload } from '@/lib/validators/city'
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

	const rowData = CityValidator.parse(row.original)

	return (
		<ContextMenu>
			<ContextMenuTrigger asChild>{children}</ContextMenuTrigger>
			<ContextMenuContent>
				<ContextMenuLabel>Actions</ContextMenuLabel>
				<ContextMenuSeparator />

				<ContextMenuItem
					onClick={() => {
						const defaultValues: CityPayload = {
							id: rowData.id,
							name: rowData.name,
							voivodeship: {
								id: rowData.voivodeship.id,
								name: rowData.voivodeship.name
							},
							description: rowData.description,
							image: rowData.image
						}

						openSheet('EDIT_CITY', defaultValues)
					}}>
					<Pencil className='mr-2 h-3.5 w-3.5 text-muted-foreground/70' />
					Edit
				</ContextMenuItem>

				<ContextMenuSeparator />

				<DeleteRow apiQuery={`/api/cities/${rowData.id}`} />
			</ContextMenuContent>
		</ContextMenu>
	)
}

export default RowActions
