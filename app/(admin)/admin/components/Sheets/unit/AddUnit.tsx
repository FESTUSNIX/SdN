'use client'

import { useFormChanges } from '@/app/(admin)/admin/hooks/useFormChanges'
import { Button } from '@/app/components/ui/button'
import { ScrollArea } from '@/app/components/ui/scroll-area'
import { SheetFooter, SheetHeader, SheetTitle } from '@/app/components/ui/sheet'
import { UnitPayload, UnitValidator } from '@/lib/validators/unit'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useGlobalSheetContext } from '../../../context/GlobalSheetContext'
import UnitForm from '../../Forms/UnitForm'

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
			workStatus: 'IN_PROGRESS',
			gallery: []
		}
	})

	useFormChanges(form.formState)

	const { mutate: createUnit, isLoading } = useMutation({
		mutationFn: async (values: UnitPayload) => {
			toast.loading('Adding a unit...')

			const payload = {
				name: values.name,
				logo: values.logo,
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
				workStatus: values.workStatus
			}

			const { data } = await axios.post('/api/units', payload)

			return data
		},
		onError: err => {
			toast.dismiss()

			if (err instanceof AxiosError) {
				if (err.response?.status === 409) {
					return toast.error('Unit with that name already exists')
				}

				if (err.response?.status === 422) {
					return toast.error('Invalid unit data')
				}
			}

			return toast.error('Something went wrong.')
		},
		onSuccess: async (data, variables) => {
			toast.dismiss()
			toast.success('Added a new unit.')
			form.reset()

			closeSheet(false, true)
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
