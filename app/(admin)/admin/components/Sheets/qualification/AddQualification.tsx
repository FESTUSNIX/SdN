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
import slugify from 'react-slugify'
import { useFormChanges } from '../../../hooks/useFormChanges'
import QualificationForm from '../../Forms/QualificationForm'

const AddQualification = () => {
	const { closeSheet } = useGlobalSheetContext()

	const form = useForm<QualificationPayload>({
		resolver: zodResolver(QualificationValidator),
		defaultValues: {
			id: 0,
			name: '',
			type: 'OGOLNE',
			keywords: []
		}
	})

	useFormChanges(form.formState)

	const { mutate: createQualification, isLoading } = useMutation({
		mutationFn: async (values: QualificationPayload) => {
			toast.loading('Adding a qualification...')

			const slug = slugify(values.name, { delimiter: '_' })

			const payload: QualificationPayload & { slug: string } = {
				id: 0,
				name: values.name,
				type: values.type,
				keywords: values.keywords,
				slug: slug
			}

			const { data } = await axios.post('/api/qualifications', payload)
			return data
		},
		onError: err => {
			toast.dismiss()

			if (err instanceof AxiosError) {
				if (err.response?.status === 409) {
					return toast.error('Qualification already exists')
				}

				if (err.response?.status === 422) {
					return toast.error('Invalid qualification data')
				}
			}

			return toast.error('Something went wrong.')
		},
		onSuccess: async data => {
			await fetch('/api/revalidate?path=/admin/qualifications')

			toast.dismiss()

			toast.success('Added a new qualification.')
			form.reset()

			closeSheet(false, true)
		}
	})

	return (
		<>
			<SheetHeader className='border-b px-6 py-4'>
				<SheetTitle>Add Qualification</SheetTitle>
			</SheetHeader>

			<ScrollArea className='h-full'>
				<QualificationForm form={form} onSubmit={e => createQualification(e)} />
			</ScrollArea>

			<SheetFooter className='flex-row justify-end gap-4 border-t px-6 py-4'>
				<Button variant={'secondary'} onClick={() => closeSheet()}>
					Cancel
				</Button>

				{isLoading ? (
					<Button type='submit' disabled>
						<Loader2 className='mr-2 h-4 w-4 animate-spin' />
						Creating qualification
					</Button>
				) : (
					<Button type='submit' onClick={form.handleSubmit(e => createQualification(e))}>
						Create qualification
					</Button>
				)}
			</SheetFooter>
		</>
	)
}

export default AddQualification
