'use client'

import { useGlobalSheetContext } from '@/app/(admin)/admin/context/GlobalSheetContext'
import { Button } from '@/app/components/ui/button'
import { ScrollArea } from '@/app/components/ui/scroll-area'
import { SheetFooter, SheetHeader, SheetTitle } from '@/app/components/ui/sheet'
import { MajorPayload, MajorValidator } from '@/lib/validators/major'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { format } from 'date-fns'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useFormChanges } from '../../../hooks/useFormChanges'
import MajorForm from '../../Forms/MajorForm'
import { useEffect } from 'react'

const EditMajor = () => {
	const { closeSheet, sheetState } = useGlobalSheetContext()
	const { defaultValues } = sheetState

	const form = useForm<MajorPayload>({
		resolver: zodResolver(MajorValidator.omit({ unitSlug: true, unitId: true })),
		defaultValues: defaultValues
	})

	useFormChanges(form.formState)

	const { mutate: updateMajor, isLoading } = useMutation({
		mutationFn: async (values: Omit<MajorPayload, 'unitSlug' | 'unitId'>) => {
			toast.loading('Editing the major...')

			const payload: Omit<MajorPayload, 'unitSlug' | 'unitId'> = {
				...values,
				endDate: values.endDate ? new Date(format(values.endDate, 'yyyy-MM-dd')) : null,
				startDate: values.startDate ? new Date(format(values.startDate, 'yyyy-MM-dd')) : null
			}

			const { data } = await axios.patch(`/api/majors/${values.id}`, payload)

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

			closeSheet(false, true)
		}
	})

	useEffect(() => {
		form.reset(defaultValues)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [defaultValues])

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
					<Button type='submit' form='major-form'>
						Edit major
					</Button>
				)}
			</SheetFooter>
		</>
	)
}

export default EditMajor
