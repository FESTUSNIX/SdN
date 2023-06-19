'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/app/components/elements/Button'
import { useForm } from 'react-hook-form'
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
import { Muted } from '@/app/components/elements/Typography'
import { v4 as uuidv4 } from 'uuid'
import { supabase } from '@/lib/supabase/supabase'

const UnitForm = () => {
	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues
	})

	const updateImageToSupabase = async (values: FormValues) => {
		const filename = `${uuidv4()}-${values.logo.name}`

		const { data, error } = await supabase.storage.from('unit-logos').upload(`${filename}`, values.logo, {
			cacheControl: '3600',
			upsert: false
		})

		if (error) throw new Error(error.message)

		const filepath = data?.path

		return filepath
	}

	async function onSubmit(values: FormValues) {
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
		await addUnit(newUnit)
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
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
				<Name form={form} />

				<Email form={form} />

				<UnitType form={form} />

				<City form={form} />

				<Website form={form} />

				<Logo form={form} />

				<IsPublic form={form} />

				<div>
					<Muted>Optional</Muted>
					<Separator className='my-2' />
				</div>

				<NIP form={form} />

				<Regon form={form} />

				<Address form={form} />

				<Notes form={form} />

				<Button type='submit'>Submit</Button>
			</form>
		</Form>
	)
}

export default UnitForm
