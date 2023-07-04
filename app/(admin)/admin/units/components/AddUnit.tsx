'use client'

import { Button } from '@/app/components/ui/Button'
import { ScrollArea } from '@/app/components/ui/ScrollArea'
import { SheetFooter, SheetHeader, SheetTitle } from '@/app/components/ui/Sheet'
import { supabase } from '@/lib/supabase/supabase'
import { UnitPayload, UnitValidator } from '@/lib/validators/unit'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { v4 as uuidv4 } from 'uuid'
import UnitForm from '../../components/UnitForm'
import { useGlobalSheetContext } from '../../context/GlobalSheetContext'

const AddUnit = () => {
	const { closeSheet } = useGlobalSheetContext()

	const form = useForm<UnitPayload>({
		resolver: zodResolver(UnitValidator),
		defaultValues: {
			name: '',
			logo: undefined as any,
			email: '',
			phone: '',
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
				phone: values.phone ?? '',
				nip: values.nip,
				cityId: values.cityId,
				regon: values.regon,
				unitType: values.unitType,
				website: values.website,
				notes: values.notes,
				street: values.street,
				postalCode: values.postalCode,
				status: values.status
			}

			const { data } = await axios.post('/api/unit', payload)

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
			toast.dismiss()
			toast.success('Added a new unit.')
			form.reset()
			closeSheet()
		}
	})

	return (
		<>
			<SheetHeader className='border-b px-6 py-4'>
				<SheetTitle>Add Unit</SheetTitle>
			</SheetHeader>

			<ScrollArea className='h-full'>
				<UnitForm form={form} onSubmit={e => createUnit(e)} />
			</ScrollArea>

			<SheetFooter className='flex-row justify-end gap-4 border-t px-6 py-4'>
				<Button variant={'secondary'} onClick={() => closeSheet()}>
					Cancel
				</Button>

				{isLoading ? (
					<Button type='submit' disabled>
						<Loader2 className='mr-2 h-4 w-4 animate-spin' />
						Adding unit
					</Button>
				) : (
					<Button type='submit' onClick={form.handleSubmit(e => createUnit(e))}>
						Add unit
					</Button>
				)}
			</SheetFooter>
		</>
	)
}

export default AddUnit
