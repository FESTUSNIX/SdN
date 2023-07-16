'use client'

import { useGlobalSheetContext } from '@/app/(admin)/admin/context/GlobalSheetContext'
import { Button } from '@/app/components/ui/Button'
import { ScrollArea } from '@/app/components/ui/ScrollArea'
import { SheetFooter, SheetHeader, SheetTitle } from '@/app/components/ui/Sheet'
import { QualificationPayload, QualificationValidator } from '@/lib/validators/qualification'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import QualificationForm from '../../components/QualificationForm'
import { useFormChanges } from '../../hooks/useFormChanges'
import { usePathname } from 'next/navigation'

const EditQualification = () => {
	const { closeSheet, sheetState } = useGlobalSheetContext()
	const { defaultValues } = sheetState

	const form = useForm<QualificationPayload & { keywordInput: string }>({
		resolver: zodResolver(QualificationValidator),
		defaultValues: defaultValues
	})

	useFormChanges(form.formState)
	const pathname = usePathname()

	const { mutate: editQualification, isLoading } = useMutation({
		mutationFn: async (values: QualificationPayload) => {
			toast.loading('Editing a qualification...')

			const payload: QualificationPayload = {
				id: values.id,
				name: values.name,
				type: values.type,
				keywords: values.keywords
			}

			const { data } = await axios.patch('/api/qualifications', payload)
			return data
		},
		onError: err => {
			toast.dismiss()

			if (err instanceof AxiosError) {
				if (err.response?.status === 404) {
					return toast.error('Could not find qualification to edit.')
				}

				if (err.response?.status === 422) {
					return toast.error('Invalid qualification data.')
				}
			}

			return toast.error('Something went wrong.')
		},
		onSuccess: async data => {
			toast.dismiss()

			toast.success('Updated qualification.')
			form.reset()

			closeSheet(false, true)
		}
	})

	return (
		<>
			<SheetHeader className='border-b px-6 py-4'>
				<SheetTitle>Edit Qualification</SheetTitle>
			</SheetHeader>

			<ScrollArea className='h-full'>
				<QualificationForm form={form} onSubmit={e => editQualification(e)} />
			</ScrollArea>

			<SheetFooter className='flex-row justify-end gap-4 border-t px-6 py-4'>
				<Button variant={'secondary'} onClick={() => closeSheet()}>
					Cancel
				</Button>

				{isLoading ? (
					<Button type='submit' disabled>
						<Loader2 className='mr-2 h-4 w-4 animate-spin' />
						Editing qualification
					</Button>
				) : (
					<Button type='submit' onClick={form.handleSubmit(e => editQualification(e))}>
						Edit qualification
					</Button>
				)}
			</SheetFooter>
		</>
	)
}

export default EditQualification
