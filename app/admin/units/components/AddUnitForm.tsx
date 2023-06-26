'use client'

import { supabase } from '@/lib/supabase/supabase'
import { UnitPayload, UnitValidator } from '@/lib/validators/unit'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { v4 as uuidv4 } from 'uuid'
import UnitForm from '../../components/modules/UnitForm'
import { useFormContext } from '../hooks/useFormContext'

type Props = {}

const AddUnitForm = (props: Props) => {
	const { openAdd, setOpenAdd } = useFormContext()

	const form = useForm<UnitPayload>({
		resolver: zodResolver(UnitValidator),
		defaultValues: {
			name: '',
			logo: undefined as any,
			email: '',
			isPublic: true,
			nip: '',
			regon: '',
			unitType: 'uczelnia',
			website: '',
			street: '',
			postalCode: '',
			cityId: 0,
			notes: '',
			status: 'IN_PROGRESS'
		}
	})

	const uploadImageToSupabase = async (logo: File) => {
		const filename = `${uuidv4()}-${logo.name}`

		const { data, error } = await supabase.storage.from('unit_logos').upload(`${filename}`, logo, {
			cacheControl: '36000',
			upsert: false
		})

		if (error) throw new Error(error.message)

		return data?.path
	}

	const { mutate: createUnit, isLoading } = useMutation({
		mutationFn: async (values: UnitPayload) => {
			toast.loading('Adding a unit...')

			const filepath = await uploadImageToSupabase(values.logo)

			const payload = {
				name: values.name,
				logo: filepath,
				isPublic: values.isPublic,
				email: values.email,
				nip: values.nip ?? undefined,
				cityId: values.cityId,
				regon: values.regon ?? undefined,
				unitType: values.unitType,
				website: values.website,
				notes: values.notes ?? undefined,
				street: values.street,
				postalCode: values.postalCode,
				status: values.status
			}

			const { data } = await axios.post('/api/unit/create', payload)

			return data
		},
		onError: err => {
			if (err instanceof AxiosError) {
				if (err.response?.status === 409) {
					return toast.error('Unit already exists')
				}

				if (err.response?.status === 422) {
					return toast.error('Invalid unit data')
				}
			}

			return toast.error('Something went wrong.')
		},
		onSuccess: data => {
			toast.success('Added a new unit.')
			form.reset()
		}
	})

	return (
		<UnitForm
			form={form}
			onSubmit={e => createUnit(e)}
			open={openAdd}
			setOpen={setOpenAdd}
			buttonText='Add unit'
			title='Add a new unit'
			buttonTextLoading='Adding...'
			isLoading={isLoading}
		/>
	)
}

export default AddUnitForm
