'use client'

import { Button } from '@/app/components/ui/Button'
import { Separator } from '@/app/components/ui/Separator/separator'
import { H2 } from '@/app/components/ui/Typography'
import { deleteFilesFromSupabase } from '@/lib/supabase/deleteFiles'
import { uploadFileToSupabase } from '@/lib/supabase/uploadImage'
import { PublicUnitPayload, PublicUnitValidator } from '@/lib/validators/public-unit'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import PreviewForm from './PreviewForm'
import UnitForm from './UnitForm'

type Props = {
	defaultValues: PublicUnitPayload
	city: string
}

const EditUnit = ({ defaultValues, city }: Props) => {
	const form = useForm<PublicUnitPayload>({
		resolver: zodResolver(PublicUnitValidator),
		defaultValues: defaultValues
	})

	const handleImageUpdate = async (values: PublicUnitPayload) => {
		let filepath = defaultValues.logo

		if (defaultValues.logo !== null && values.logo !== defaultValues.logo) {
			await deleteFilesFromSupabase('unit_logos', [`${values.id}/unit-logo`])
			filepath = null
		}

		if (values.logo !== null && values.logo !== defaultValues.logo) {
			filepath = await uploadFileToSupabase(
				'unit_logos',
				values.logo,
				`${values.id}/unit-logo?t=${new Date().toString()}`
			)
		}

		return filepath
	}

	const { mutate: updateUnit, isLoading } = useMutation({
		mutationFn: async (values: PublicUnitPayload) => {
			toast.loading('Updating unit...')

			let filepath: string | null = await handleImageUpdate(values)

			const payload: PublicUnitPayload = {
				id: defaultValues.id,
				name: values.name,
				logo: filepath,
				isPublic: values.isPublic,
				email: values.email,
				phone: values.phone ?? '',
				nip: values.nip ?? '',
				cityId: values.cityId,
				regon: values.regon ?? '',
				website: values.website,
				street: values.street ?? '',
				postalCode: values.postalCode ?? ''
			}

			console.log(payload)

			// TODO: Make api call

			return { status: 'OK' }
		},
		onError: err => {
			toast.dismiss()

			if (err instanceof AxiosError) {
				if (err.response?.status === 404) {
					return toast.error('Could not find unit to update')
				}

				if (err.response?.status === 422) {
					return toast.error('Invalid unit data')
				}
			}

			return toast.error('Something went wrong.')
		},
		onSuccess: data => {
			toast.dismiss()
			toast.success('Updated unit.')

			form.reset()
		}
	})

	return (
		<div className='grid grid-cols-2 gap-8'>
			<div className='rounded-md border bg-card p-2 px-4 py-2.5 text-card-foreground shadow-sm'>
				<H2 className='py-2 text-xl'>Domyślne wartości</H2>
				<Separator className='mb-6 mt-2.5' />
				<PreviewForm defaultValues={defaultValues} city={city} />
			</div>
			<div className='rounded-md border bg-card p-2 px-4 py-2.5 text-card-foreground shadow-sm'>
				<H2 className='py-2 text-xl'>Nowe wartości</H2>
				<Separator className='mb-6 mt-2.5' />

				<UnitForm form={form} onSubmit={e => updateUnit(e)} />

				<Button className='ml-auto mt-12 block' type='submit' form='unit-form'>
					Edytuj dane
				</Button>
			</div>
		</div>
	)
}

export default EditUnit
