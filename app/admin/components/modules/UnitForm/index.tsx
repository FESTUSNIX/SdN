'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/app/components/elements/Button'
import { useForm, useFormState } from 'react-hook-form'
import { useEffect } from 'react'
import Name from './components/elements/Name'
import Logo from './components/elements/Logo'
import IsPublic from './components/elements/IsPublic'
import NIP from './components/elements/NIP'
import UnitType from './components/elements/UnitType'
import Website from './components/elements/Website'
import Address from './components/modules/Address'
import Regon from './components/elements/Regon'
import { Form } from '@/app/components/elements/Form'
import Notes from './components/elements/Notes'
import { addUnit } from '@/lib/prisma/addUnit'
import City from './components/elements/City'
import { FormValues, defaultValues, formSchema } from './FormDefinition'
import Email from './components/elements/Email'
import { Separator } from '@/app/components/elements/Separator/separator'
import { H4, Muted } from '@/app/components/elements/Typography'
import { v4 as uuidv4 } from 'uuid'
import { supabase } from '@/lib/supabase/supabase'
import toast from 'react-hot-toast'
import { ScrollArea } from '@/app/components/elements/ScrollArea'
import { SheetContent, SheetFooter, SheetHeader, SheetTitle } from '@/app/components/elements/Sheet'
import { Loader2 } from 'lucide-react'
import { revalidateTag } from 'next/cache'

const UnitForm = () => {
	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues
	})

	const { isSubmitting } = useFormState({
		control: form.control
	})
	const updateImageToSupabase = async (values: FormValues) => {
		const filename = `${uuidv4()}-${values.logo.name}`

		const { data, error } = await supabase.storage.from('unit_logos').upload(`${filename}`, values.logo, {
			cacheControl: '36000',
			upsert: false
		})

		if (error) throw new Error(error.message)

		const filepath = data?.path

		return filepath
	}

	async function onSubmit(values: FormValues) {
		const submitToast = toast.loading('Adding...')

		try {
			const filepath = await updateImageToSupabase(values)
			const newUnit = {
				name: values.name,
				logo: filepath,
				isPublic: values.isPublic,
				email: values.email,
				nip: values.nip ?? null,
				cityId: values.cityId,
				regon: values.regon ?? null,
				unitType: values.unitType !== 'inna' ? values.unitType : values.otherUnitType!,
				website: values.website,
				notes: values.notes ?? null,
				address: {
					street: values.street,
					postalCode: values.postalCode,
					cityId: values.cityId
				}
			}
			const res = await addUnit(newUnit)
			const revalidate = await fetch('/api/revalidate?tag=units')

			console.log(revalidate)
			toast.success('Added a new Unit', {
				id: submitToast
			})
			form.reset(defaultValues)
		} catch (error: any) {
			toast.error(error.message, {
				id: submitToast
			})
		}
	}

	useEffect(() => {
		if (form.getValues().unitType === 'inna') {
			form.reset({ ...form.getValues(), otherUnitType: undefined })
			form.unregister(['otherUnitType'])
		} else {
			form.register('otherUnitType', { required: true })
		}
	}, [form.getValues().unitType])

	return (
		<SheetContent position={'right'} size={'default'} className='p-0 max-w-xl w-screen flex flex-col gap-0'>
			<SheetHeader className='px-6 py-4 border-b'>
				<SheetTitle>Add new Unit</SheetTitle>
			</SheetHeader>

			<ScrollArea className='h-full'>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className='py-4'>
						<div className='px-6 space-y-8 '>
							<Name form={form} />

							<Email form={form} />

							<UnitType form={form} />

							<City form={form} />

							<Website form={form} />

							<Logo form={form} />

							<IsPublic form={form} />

							<Address form={form} />
						</div>

						<Separator className='my-12' />

						<div className='px-6 space-y-8'>
							<div>
								<H4>Optional</H4>
								<Muted>These fields are optional and can be filled later</Muted>
							</div>

							<NIP form={form} />

							<Regon form={form} />

							<Notes form={form} />
						</div>
					</form>
				</Form>
			</ScrollArea>

			<SheetFooter className='px-6 py-4 border-t gap-4 flex-row justify-end'>
				<Button variant={'secondary'}>Cancel</Button>

				{isSubmitting ? (
					<Button type='submit' disabled>
						<Loader2 className='mr-2 h-4 w-4 animate-spin' />
						Adding...
					</Button>
				) : (
					<Button type='submit' onClick={form.handleSubmit(onSubmit)}>
						Add unit
					</Button>
				)}
			</SheetFooter>
		</SheetContent>
	)
}

export default UnitForm
