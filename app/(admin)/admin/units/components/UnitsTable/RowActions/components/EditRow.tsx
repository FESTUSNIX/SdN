'use client'

import { ContextMenuItem } from '@/app/components/ui/ContextMenu'
import { UnitPayload } from '@/lib/validators/unit'
import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { Pencil } from 'lucide-react'
import { toast } from 'react-hot-toast'
import { TableUnitData } from '../../../../page'
import { useGlobalSheetContext } from '@/app/(admin)/admin/context/GlobalSheetContext'

type Props = {
	rowData: TableUnitData
}

const EditRow = ({ rowData }: Props) => {
	const { openSheet } = useGlobalSheetContext()

	const { mutate: deleteRow } = useMutation({
		mutationFn: async () => {
			const query = `/api/unit?id=${rowData.id}`

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
				id: data.id,
				name: data.name,
				logo: undefined as any,
				email: data.email,
				phone: data.phone ?? '',
				isPublic: data.isPublic,
				nip: data.nip ?? '',
				regon: data.regon ?? '',
				unitType: data.unitType,
				cityId: data.cityId,
				status: data.status,
				website: data.website,
				notes: data.notes ?? '',
				street: data.address?.street ?? '',
				postalCode: data.address?.postalCode ?? ''
			}

			openSheet('EDIT_UNIT', values)
		}
	})

	return (
		<ContextMenuItem
			onClick={() => {
				deleteRow()
			}}>
			<Pencil className='mr-2 h-3.5 w-3.5 text-muted-foreground/70' />
			Edit
		</ContextMenuItem>
	)
}

export default EditRow
