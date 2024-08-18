'use client'

import { useGlobalSheetContext } from '@/app/(admin)/admin/context/GlobalSheetContext'
import { ContextMenuItem } from '@/app/components/ui/context-menu'
import {
	MajorPayload,
	MajorPayloadWithFullQualifications,
	MajorTablePayload,
	MajorValidator
} from '@/lib/validators/major'
import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { Pencil } from 'lucide-react'
import { toast } from 'react-hot-toast'

type Props = {
	rowData: MajorTablePayload
}

const EditRow = ({ rowData }: Props) => {
	const { openSheet, overrideData } = useGlobalSheetContext()

	const { mutate: editRow } = useMutation({
		mutationFn: async () => {
			openSheet('EDIT_MAJOR', rowData)

			const query = `/api/majors/${rowData.id}`
			const { data } = await axios.get(query)

			return data
		},
		onError: err => {
			if (err instanceof AxiosError) {
				if (err.response?.status === 404) {
					return toast.error('Could not find this major')
				}

				if (err.response?.status === 422) {
					return toast.error('Invalid major data')
				}
			}

			return toast.error('Something went wrong.')
		},
		onSuccess: (data: MajorPayloadWithFullQualifications) => {
			const qualificationsWithIdOnly = data.qualifications.map(qualification => qualification.id)

			const parsedData = MajorValidator.parse({ ...data, qualifications: qualificationsWithIdOnly })

			const values: Omit<MajorPayload, 'unitSlug'> = {
				...parsedData,
				id: data.id,
				isOnline: !!parsedData.isOnline,
				canPayInInstallments: !!parsedData.canPayInInstallments
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
