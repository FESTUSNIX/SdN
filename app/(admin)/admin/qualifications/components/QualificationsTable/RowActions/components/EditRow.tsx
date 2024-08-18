'use client'

import { useGlobalSheetContext } from '@/app/(admin)/admin/context/GlobalSheetContext'
import { ContextMenuItem } from '@/app/components/ui/context-menu'
import { QualificationPayload } from '@/lib/validators/qualification'
import { Pencil } from 'lucide-react'

type Props = {
	rowData: QualificationPayload
}

const EditRow = ({ rowData }: Props) => {
	const { openSheet } = useGlobalSheetContext()

	return (
		<ContextMenuItem
			onClick={() => {
				const defaultValues: QualificationPayload = {
					id: rowData.id,
					name: rowData.name,
					type: rowData.type,
					keywords: rowData.keywords
				}

				openSheet('EDIT_QUALIFICATION', defaultValues)
			}}>
			<Pencil className='mr-2 h-3.5 w-3.5 text-muted-foreground/70' />
			Edit
		</ContextMenuItem>
	)
}

export default EditRow
