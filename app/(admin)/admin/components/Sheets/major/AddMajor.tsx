'use client'

import { useGlobalSheetContext } from '@/app/(admin)/admin/context/GlobalSheetContext'
import { Button } from '@/app/components/ui/Button'
import { ScrollArea } from '@/app/components/ui/ScrollArea'
import { SheetFooter, SheetHeader, SheetTitle } from '@/app/components/ui/Sheet'
import { getFirstParamValue } from '@/lib/utils'
import { MajorPayload, MajorValidator } from '@/lib/validators/major'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { format } from 'date-fns'
import { Loader2 } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useFormChanges } from '../../../hooks/useFormChanges'
import MajorForm from '../../Forms/MajorForm'

const AddMajor = () => {
	const {
		closeSheet,
		sheetState: { defaultValues }
	} = useGlobalSheetContext()
	const { unitId: unitIdParam } = useParams()

	const unitId = parseInt(getFirstParamValue(unitIdParam, defaultValues?.unitId) ?? '')

	const form = useForm<MajorPayload>({
		resolver: zodResolver(MajorValidator.omit({ unitSlug: true, id: true })),
		defaultValues: {
			unitId: unitId,
			name: '',
			majorLevel: 'PODYPLOMOWE',
			address: '',
			canPayInInstallments: false,
			certificates: '',
			completionConditions: [],
			description: [],
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
			recruitmentConditions: [],
			workStatus: 'IN_PROGRESS',
			syllabus: [],
			keywords: [],
			status: 'DRAFT',
			url: ''
		}
	})

	useFormChanges(form.formState)

	const { mutate: createMajor, isLoading } = useMutation({
		mutationFn: async (values: Omit<MajorPayload, 'unitSlug'>) => {
			toast.loading('Adding a major...')

			const payload: Omit<MajorPayload, 'id' | 'unitSlug'> = {
				...values,
				endDate: values.endDate ? new Date(format(values.endDate, 'yyyy-MM-dd')) : null,
				startDate: values.startDate ? new Date(format(values.startDate, 'yyyy-MM-dd')) : null
			}

			const { data } = await axios.post('/api/majors', payload)
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
					<Button disabled>
						<Loader2 className='mr-2 h-4 w-4 animate-spin' />
						Adding major
					</Button>
				) : (
					<Button type='submit' form='major-form'>
						Add major
					</Button>
				)}
			</SheetFooter>
		</>
	)
}

export default AddMajor
