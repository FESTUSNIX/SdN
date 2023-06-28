'use client'

import { UnitPayload, UnitValidator } from '@/lib/validators/unit'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import UnitForm from '../../components/UnitForm'
import { useFormContext } from '../hooks/useFormContext'

type Props = {}

const EditUnitForm = (props: Props) => {
	const { openEdit, setOpenEdit, editDefaultValues } = useFormContext()
	const router = useRouter()

	const form = useForm<UnitPayload>({
		resolver: zodResolver(UnitValidator),
		defaultValues: editDefaultValues
	})

	useEffect(() => {
		form.reset(editDefaultValues)
	}, [editDefaultValues])

	const { mutate: updateUnit, isLoading } = useMutation({
		mutationFn: async (values: UnitPayload) => {
			toast.loading('Updating unit...')

			const payload: UnitPayload = {
				id: editDefaultValues.id,
				name: values.name,
				logo: values.logo,
				isPublic: values.isPublic,
				email: values.email,
				phone: values.phone ?? '',
				nip: values.nip ?? '',
				cityId: values.cityId,
				regon: values.regon ?? '',
				unitType: values.unitType,
				website: values.website,
				notes: values.notes,
				street: values.street ?? '',
				postalCode: values.postalCode ?? '',
				status: values.status
			}

			const { data } = await axios.patch('/api/unit/update', payload)

			return data
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

			setOpenEdit(false)
		}
	})

	return (
		<>
			<UnitForm
				form={form}
				onSubmit={e => updateUnit(e)}
				open={openEdit}
				setOpen={setOpenEdit}
				buttonText='Confirm changes'
				title='Edit unit'
				buttonTextLoading='Updating...'
				isLoading={isLoading}
			/>
		</>
	)
}

export default EditUnitForm
