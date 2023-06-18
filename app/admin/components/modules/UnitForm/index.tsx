'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
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

const formSchema = z.object({
	name: z.string().min(2, {
		message: 'Username must be at least 2 characters.'
	}),
	logo: z.string().url(),
	isPublic: z.boolean().default(true),
	nip: z.string().optional(),
	regon: z.string().optional(),
	unitType: z.enum(['uczelnia', 'placówka doskonalenia nauczycieli', 'inna']),
	otherUnitType: z.string(),
	website: z.string().url(),
	street: z
		.string({
			required_error: 'Please enter a street address.'
		})
		.min(2, { message: 'Street address must be at least 2 characters.' }),
	postalCode: z.string().regex(/^\d{2}-\d{3}$/, {
		message: 'Postal code must be in format 00-000.'
	}),
	cityId: z
		.number({
			required_error: 'Please select a city'
		})
		.positive({
			message: 'Please select a city'
		})
})

const UnitForm = () => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
			logo: '',
			isPublic: true,
			nip: '',
			regon: '',
			unitType: 'uczelnia',
			otherUnitType: '',
			website: '',
			street: '',
			postalCode: '',
			cityId: 0
		}
	})

	function onSubmit(values: z.infer<typeof formSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		console.log(values)
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

				<Logo form={form} />

				<IsPublic form={form} />

				<NIP form={form} />

				<Regon form={form} />

				<UnitType form={form} />

				<Website form={form} />

				<Address form={form} />

				<Button type='submit'>Submit</Button>
			</form>
		</Form>
	)
}

export default UnitForm
