'use client'

import MajorForm from '@/app/(admin)/admin/components/MajorForm'
import { useGlobalSheetContext } from '@/app/(admin)/admin/context/GlobalSheetContext'
import { Button } from '@/app/components/ui/Button'
import { ScrollArea } from '@/app/components/ui/ScrollArea'
import { SheetFooter, SheetHeader, SheetTitle } from '@/app/components/ui/Sheet'
import { MajorPayload, MajorValidator } from '@/lib/validators/major'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { Loader2 } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

const EditMajor = () => {
	const { closeSheet, sheetState } = useGlobalSheetContext()
	const { defaultValues } = sheetState

	const { unitId } = useParams()

	const form = useForm<MajorPayload>({
		resolver: zodResolver(MajorValidator),
		defaultValues: defaultValues
	})

	const { mutate: updateMajor, isLoading } = useMutation({
		mutationFn: async (values: MajorPayload) => {
			toast.loading('Editing a major...')
			console.log(values)
			const payload: MajorPayload = {
				id: values.id,
				unitId: parseInt(unitId),
				name: values.name,
				majorLevel: values.majorLevel,
				address: values.address,
				canPayInInstallments: values.canPayInInstallments,
				certificates: values.certificates,
				completionConditions: values.completionConditions,
				contact: values.contact,
				cost: values.cost,
				daysOfWeek: values.daysOfWeek,
				description: values.description,
				durationInHours: values.durationInHours,
				endDate: values.endDate,
				startDate: values.startDate,
				formOfStudy: values.formOfStudy,
				isOnline: values.isOnline,
				numberOfSemesters: values.numberOfSemesters,
				onlineDuration: values.onlineDuration,
				organisator: values.organisator,
				qualifications: values.qualifications,
				recruitmentConditions: values.recruitmentConditions,
				status: values.status,
				syllabus: values.syllabus,
				isRegulated: values.isRegulated
			}

			const { data } = await axios.patch('/api/unit/major', payload)

			return data
		},
		onError: err => {
			toast.dismiss()

			if (err instanceof AxiosError) {
				if (err.response?.status === 404) {
					return toast.error('Could not find major to update')
				}

				if (err.response?.status === 422) {
					return toast.error('Invalid major data')
				}
			}

			return toast.error('Something went wrong.')
		},
		onSuccess: data => {
			toast.dismiss()

			toast.success('Updated major.')
			form.reset()

			closeSheet()
		}
	})

	return (
		<>
			<SheetHeader className='border-b px-6 py-4'>
				<SheetTitle>Edit Major</SheetTitle>
			</SheetHeader>

			<ScrollArea className='h-full'>
				<MajorForm form={form} onSubmit={e => updateMajor(e)} />
			</ScrollArea>

			<SheetFooter className='flex-row justify-end gap-4 border-t px-6 py-4'>
				<Button variant={'secondary'} onClick={() => closeSheet()}>
					Cancel
				</Button>

				{isLoading ? (
					<Button type='submit' disabled>
						<Loader2 className='mr-2 h-4 w-4 animate-spin' />
						Editing major
					</Button>
				) : (
					<Button type='submit' onClick={form.handleSubmit(e => updateMajor(e))}>
						Edit major
					</Button>
				)}
			</SheetFooter>
		</>
	)
}

export default EditMajor
