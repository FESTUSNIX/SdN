'use client'

import { useGlobalSheetContext } from '@/app/(admin)/admin/context/GlobalSheetContext'
import { ContextMenuItem } from '@/app/components/ui/ContextMenu'
import { TableUnitData, UnitPayload } from '@/lib/validators/unit'
import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { Pencil } from 'lucide-react'
import { toast } from 'react-hot-toast'

type Props = {
	rowData: TableUnitData
}

const EditRow = ({ rowData }: Props) => {
	const { openSheet, overrideData } = useGlobalSheetContext()

	const { mutate: editRow } = useMutation({
		mutationFn: async () => {
			openSheet('EDIT_UNIT', rowData)

			const query = `/api/units/${rowData.id}`
			const { data } = await axios.get(query)

			return data
		},
		onError: err => {
			if (err instanceof AxiosError) {
				if (err.response?.status === 404) {
					return toast.error('Could not find this unit')
				}

				if (err.response?.status === 422) {
					return toast.error('Invalid unit data')
				}
			}

			return toast.error('Something went wrong.')
		},
		onSuccess: data => {
			const values: UnitPayload = {
				...data,
				phone: data.phone ?? '',
				nip: data.nip ?? '',
				regon: data.regon ?? '',
				notes: data.notes ?? '',
				street: data.address?.street ?? '',
				postalCode: data.address?.postalCode ?? ''
			}

			overrideData(values)
		}
	})

	return (
		<ContextMenuItem
			onClick={() => {
				editRow()
			}}>
			<Pencil className='mr-2 h-3.5 w-3.5 text-muted-foreground/70' />
			Edit
		</ContextMenuItem>
	)
}

export default EditRow
