'use client'

import { useGlobalSheetContext } from '@/app/(admin)/admin/context/GlobalSheetContext'
import { useFormContext } from '@/app/(admin)/admin/units/hooks/useFormContext'
import { ContextMenuItem } from '@/app/components/ui/ContextMenu'
import { MajorPayload, MajorPayloadWithFullQualifications, MajorValidator } from '@/lib/validators/major'
import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { Pencil } from 'lucide-react'
import { toast } from 'react-hot-toast'

type Props = {
	majorId: number
}

const EditRow = ({ majorId }: Props) => {
	const { openSheet } = useGlobalSheetContext()

	const { mutate: deleteRow } = useMutation({
		mutationFn: async () => {
			const query = `/api/unit/major?id=${majorId}`

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

			const {
				address,
				canPayInInstallments,
				certificates,
				completionConditions,
				contact,
				cost,
				daysOfWeek,
				description,
				durationInHours,
				endDate,
				formOfStudy,
				isOnline,
				majorLevel,
				name,
				numberOfSemesters,
				onlineDuration,
				organisator,
				qualifications,
				recruitmentConditions,
				startDate,
				status,
				syllabus,
				unitId,
				isRegulated
			} = MajorValidator.parse({ ...data, qualifications: qualificationsWithIdOnly })

			const values: MajorPayload = {
				id: data.id,
				name: name,
				address: address,
				contact: contact,
				cost: cost,
				durationInHours: durationInHours,
				endDate: endDate,
				formOfStudy: formOfStudy,
				isOnline: !!isOnline,
				majorLevel: majorLevel,
				numberOfSemesters: numberOfSemesters,
				onlineDuration: onlineDuration,
				organisator: organisator,
				recruitmentConditions: recruitmentConditions,
				startDate: startDate,
				syllabus: syllabus,
				unitId: unitId,
				isRegulated: isRegulated,
				canPayInInstallments: !!canPayInInstallments,
				certificates: certificates,
				completionConditions: completionConditions,
				daysOfWeek: daysOfWeek,
				description: description,
				status: status,
				qualifications: qualifications
			}

			openSheet('EDIT_MAJOR', values)
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
