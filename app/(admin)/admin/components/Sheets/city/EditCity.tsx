'use client'

import { useGlobalSheetContext } from '@/app/(admin)/admin/context/GlobalSheetContext'
import { Button } from '@/app/components/ui/button'
import { ScrollArea } from '@/app/components/ui/scroll-area'
import { SheetFooter, SheetHeader, SheetTitle } from '@/app/components/ui/sheet'
import { CityPayload, CityValidator } from '@/lib/validators/city'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { Loader2 } from 'lucide-react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useFormChanges } from '../../../hooks/useFormChanges'
import { CityForm } from '../../Forms/CityForm'
import { uploadFileToSupabase } from '@/lib/supabase/filesClient'
import { deleteFilesFromSupabase } from '@/lib/supabase/filesClient'
import { revalidatePaths } from '@/app/_actions'

const EditCity = () => {
	const { closeSheet, sheetState } = useGlobalSheetContext()
	const { defaultValues } = sheetState

	const form = useForm<CityPayload>({
		resolver: zodResolver(CityValidator),
		defaultValues: defaultValues
	})

	useFormChanges(form.formState)

	const handleImage = async (cityId: number, image: File) => {
		let filepath = defaultValues.image

		if ((image === null || image === undefined || !image) && defaultValues.image) {
			await deleteFilesFromSupabase('cities', [`${cityId}/main-image`])
			filepath = null
		}

		if (image instanceof File) {
			filepath = await uploadFileToSupabase('cities', image, `${cityId}/main-image`, true)
		}

		return filepath
	}

	const { mutate: createCity, isLoading } = useMutation({
		mutationFn: async (values: CityPayload) => {
			toast.loading('Editing the city...')

			if (!values.id) {
				return toast.error('Invalid city data')
			}

			const imagePath = await handleImage(values.id, values.image)

			const payload: CityPayload = {
				id: values.id,
				name: values.name,
				voivodeship: {
					id: values.voivodeship.id
				},
				description: values.description,
				image: imagePath
			}

			const { data } = await axios.patch('/api/cities', payload)
			return data
		},
		onError: err => {
			toast.dismiss()

			if (err instanceof AxiosError) {
				if (err.response?.status === 404) {
					return toast.error('Could not find city to edit')
				}

				if (err.response?.status === 422) {
					return toast.error('Invalid city data')
				}
			}

			return toast.error('Something went wrong.')
		},
		onSuccess: async data => {
			revalidatePaths(['/admin/cities'])

			toast.dismiss()

			toast.success('Successfully edited')
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
				<SheetTitle>Edit City</SheetTitle>
			</SheetHeader>

			<ScrollArea className='h-full'>
				<CityForm form={form} onSubmit={e => createCity(e)} />
			</ScrollArea>

			<SheetFooter className='flex-row justify-end gap-4 border-t px-6 py-4'>
				<Button variant={'secondary'} onClick={() => closeSheet()}>
					Cancel
				</Button>

				{isLoading ? (
					<Button disabled>
						<Loader2 className='mr-2 h-4 w-4 animate-spin' />
						Editing city
					</Button>
				) : (
					<Button type='submit' onClick={form.handleSubmit(e => createCity(e))}>
						Edit city
					</Button>
				)}
			</SheetFooter>
		</>
	)
}

export default EditCity
