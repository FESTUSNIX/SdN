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
import { useFormChanges } from '../../../../../hooks/useFormChanges'
import { format } from 'date-fns'

const AddMajor = () => {
	const { closeSheet } = useGlobalSheetContext()
	const { unitId } = useParams()

	const form = useForm<MajorPayload>({
		resolver: zodResolver(MajorValidator),
		defaultValues: {
			id: 0,
			unitId: parseInt(unitId),
			name: '',
			majorLevel: 'PODYPLOMOWE',
			address: '',
			canPayInInstallments: false,
			certificates: '',
			completionConditions: '',
			description: '',
			contact: '',
			cost: null,
			daysOfWeek: [],
			durationInHours: null,
			endDate: null,
			startDate: null,
			formOfStudy: '',
			isOnline: false,
			isRegulated: true,
			numberOfSemesters: null,
			onlineDuration: null,
			organisator: '',
			qualifications: [],
			recruitmentConditions: '',
			status: 'IN_PROGRESS',
			syllabus: ''
		}
	})

	useFormChanges(form.formState)

	const { mutate: createMajor, isLoading } = useMutation({
		mutationFn: async (values: MajorPayload) => {
			toast.loading('Adding a major...')

			const payload: MajorPayload = {
				id: 0,
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
				endDate: values.endDate ? new Date(format(values.endDate, 'yyyy-MM-dd')) : null,
				startDate: values.startDate ? new Date(format(values.startDate, 'yyyy-MM-dd')) : null,
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

			const { data } = await axios.post('/api/unit/major', payload)
			return data
		},
		onError: err => {
			toast.dismiss()

			if (err instanceof AxiosError) {
				if (err.response?.status === 409) {
					return toast.error('Major already exists')
				}

				if (err.response?.status === 422) {
					return toast.error('Invalid major data')
				}
			}

			return toast.error('Something went wrong.')
		},
		onSuccess: data => {
			toast.dismiss()

			toast.success('Added a new major.')
			form.reset()

			closeSheet(false, true)
		}
	})

	return (
		<>
			<SheetHeader className='border-b px-6 py-4'>
				<SheetTitle>Add Major</SheetTitle>
			</SheetHeader>

			<ScrollArea className='h-full'>
				<MajorForm form={form} onSubmit={e => createMajor(e)} />
			</ScrollArea>

			<SheetFooter className='flex-row justify-end gap-4 border-t px-6 py-4'>
				<Button variant={'secondary'} onClick={() => closeSheet()}>
					Cancel
				</Button>

				{isLoading ? (
					<Button type='submit' disabled>
						<Loader2 className='mr-2 h-4 w-4 animate-spin' />
						Adding major
					</Button>
				) : (
					<Button type='submit' onClick={form.handleSubmit(e => createMajor(e))}>
						Add major
					</Button>
				)}
			</SheetFooter>
		</>
	)
}

export default AddMajor
