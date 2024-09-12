'use client'

import { useGlobalSheetContext } from '@/app/(admin)/admin/context/GlobalSheetContext'
import { revalidatePaths } from '@/app/_actions'
import { Button } from '@/app/components/ui/button'
import { ScrollArea } from '@/app/components/ui/scroll-area'
import { SheetFooter, SheetHeader, SheetTitle } from '@/app/components/ui/sheet'
import { CityPayload, CityValidator } from '@/lib/validators/city'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useFormChanges } from '../../../hooks/useFormChanges'
import { CityForm } from '../../Forms/CityForm'

const AddCity = () => {
	const { closeSheet } = useGlobalSheetContext()

	const form = useForm<CityPayload>({
		resolver: zodResolver(CityValidator),
		defaultValues: {
			name: '',
			voivodeship: {
				id: undefined,
				name: ''
			},
			description: null,
			image: null
		}
	})

	useFormChanges(form.formState)

	const { mutate: createCity, isLoading } = useMutation({
		mutationFn: async (values: CityPayload) => {
			toast.loading('Adding a city...')

			const payload: Omit<CityPayload, 'id'> = {
				name: values.name,
				voivodeship: {
					id: values.voivodeship.id
				},
				description: values.description,
				image: values.image
			}

			const { data } = await axios.post('/api/cities', payload)
			return data
		},
		onError: err => {
			toast.dismiss()

			if (err instanceof AxiosError) {
				if (err.response?.status === 409) {
					return toast.error('City already exists')
				}

				if (err.response?.status === 422) {
					return toast.error('Invalid city data')
				}
			}

			return toast.error('Something went wrong.')
		},
		onSuccess: async (data, variables) => {
			revalidatePaths(['/admin/cities'])

			toast.dismiss()

			toast.success('Added a new city.')
			form.reset()

			closeSheet(false, true)
		}
	})

	return (
		<>
			<SheetHeader className='border-b px-6 py-4'>
				<SheetTitle>Add City</SheetTitle>
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
						Creating city
					</Button>
				) : (
					<Button type='submit' onClick={form.handleSubmit(e => createCity(e))}>
						Create city
					</Button>
				)}
			</SheetFooter>
		</>
	)
}

export default AddCity
