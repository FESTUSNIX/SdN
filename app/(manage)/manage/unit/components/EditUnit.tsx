'use client'

import { Button } from '@/app/components/ui/Button'
import { Separator } from '@/app/components/ui/Separator/separator'
import { H2 } from '@/app/components/ui/Typography'
import { deleteFilesFromSupabase } from '@/lib/supabase/deleteFiles'
import { uploadFileToSupabase } from '@/lib/supabase/uploadImage'
import { PublicUnitPayload, PublicUnitValidator } from '@/lib/validators/public-unit'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
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

	const handleImageUpdate = async (values: PublicUnitPayload): Promise<string | undefined> => {
		let filepath = defaultValues.logo

		if (!filepath || !values.logo) return undefined

		if (values.logo !== filepath) {
			await deleteFilesFromSupabase('unit_logos', [`${values.id}/unit-logo`])
			filepath = undefined
		}

		if (values.logo !== null && values.logo !== filepath) {
			filepath = await uploadFileToSupabase(
				'unit_logos',
				values.logo,
				`${values.id}/unit-logo?t=${new Date().toString()}`
			)
		}

		return filepath
	}

	const { mutate: requestUpdate, isLoading } = useMutation({
		mutationFn: async (values: PublicUnitPayload) => {
			toast.loading('Trwa aktualizowanie danych...')

			let filepath = await handleImageUpdate(values)

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

			const changedFields = Object.keys(payload).filter(key => (payload as any)[key] !== (defaultValues as any)[key])
			const filteredPayload = changedFields.reduce((obj, key) => ({ ...obj, [key]: (payload as any)[key] }), {})

			const {} = await axios.patch(`/api/units/${defaultValues.id}`, filteredPayload)

			return 'OK'
		},
		onError: err => {
			toast.dismiss()

			if (err instanceof AxiosError) {
				if (err.response?.status === 404) {
					return toast.error('Nie odnaleziono jednostki do aktualizacji')
				}

				if (err.response?.status === 403) {
					return toast.error('Nie posiadasz wystarczających uprawnień')
				}

				if (err.response?.status === 422) {
					return toast.error('Nie poprawne dane')
				}
			}

			return toast.error('Coś poszło nie tak')
		},
		onSuccess: data => {
			toast.dismiss()
			toast.success('Pomyślnie zaaktualizowano dane')

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

				<UnitForm form={form} onSubmit={e => requestUpdate(e)} />

				<Button className='ml-auto mt-12 block' type='submit' form='unit-form' disabled={isLoading}>
					{isLoading ? 'Edytowanie danych' : 'Edytuj dane'}
				</Button>
			</div>
		</div>
	)
}

export default EditUnit
