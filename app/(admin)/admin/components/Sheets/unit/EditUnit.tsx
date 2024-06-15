'use client'

import { Button } from '@/app/components/ui/Button'
import { ScrollArea } from '@/app/components/ui/ScrollArea'
import { SheetFooter, SheetHeader, SheetTitle } from '@/app/components/ui/Sheet'
import { deleteFilesFromSupabase } from '@/lib/supabase/deleteFiles'
import { uploadFileToSupabase } from '@/lib/supabase/uploadImage'
import { UnitPayload, UnitValidator } from '@/lib/validators/unit'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { Loader2 } from 'lucide-react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useGlobalSheetContext } from '../../../context/GlobalSheetContext'
import { useFormChanges } from '../../../hooks/useFormChanges'
import UnitForm from '../../Forms/UnitForm'

const EditUnit = () => {
	const { closeSheet, sheetState } = useGlobalSheetContext()
	const { defaultValues } = sheetState

	const form = useForm<UnitPayload>({
		resolver: zodResolver(UnitValidator),
		defaultValues: defaultValues
	})

	useEffect(() => {
		form.reset(defaultValues)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [defaultValues])

	useFormChanges(form.formState)

	const handleImageUpdate = async (values: UnitPayload) => {
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
		mutationFn: async (values: UnitPayload) => {
			toast.loading('Updating unit...')

			let filepath: string | null = await handleImageUpdate(values)

			const payload: UnitPayload = {
				id: defaultValues.id,
				name: values.name,
				logo: filepath,
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
				workStatus: values.workStatus
			}

			const { data } = await axios.patch(`/api/units/${defaultValues.id}`, payload)

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

			closeSheet(false, true)
		}
	})

	return (
		<>
			<SheetHeader className='border-b px-6 py-4'>
				<SheetTitle>Edit Unit</SheetTitle>
			</SheetHeader>

			<ScrollArea className='h-full'>
				<UnitForm form={form} onSubmit={e => updateUnit(e)} />
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
					<Button type='submit' onClick={form.handleSubmit(e => updateUnit(e))}>
						Edit unit
					</Button>
				)}
			</SheetFooter>
		</>
	)
}

export default EditUnit
