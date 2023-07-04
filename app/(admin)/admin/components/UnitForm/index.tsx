'use client'

import { Form } from '@/app/components/ui/Form'
import { Separator } from '@/app/components/ui/Separator/separator'
import { H4, Muted } from '@/app/components/ui/Typography'
import { UnitFormType, UnitPayload } from '@/lib/validators/unit'
import { SubmitHandler } from 'react-hook-form'
import City from './components/City'
import Email from './components/Email'
import IsPublic from './components/IsPublic'
import Logo from './components/Logo'
import NIP from './components/NIP'
import Name from './components/Name'
import Notes from './components/Notes'
import Phone from './components/Phone'
import Regon from './components/Regon'
import Status from './components/Status'
import UnitType from './components/UnitType'
import Website from './components/Website'
import Address from './components/Address'

type Props = {
	form: UnitFormType
	onSubmit: SubmitHandler<UnitPayload>
}

const UnitForm = ({ form, onSubmit }: Props) => {
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(e => onSubmit(e))} className='py-4'>
				<div className='space-y-8 px-6 '>
					<Name form={form} />

					<Email form={form} />

					<UnitType form={form} />

					<City form={form} />

					<Website form={form} />

					<Logo form={form} />

					<IsPublic form={form} />

					<Status form={form} />
				</div>

				<Separator className='my-12' />

				<div className='space-y-8 px-6'>
					<div>
						<H4>Optional</H4>
						<Muted>These fields are optional and can be filled later</Muted>
					</div>
					<Phone form={form} />

					<Address form={form} />

					<NIP form={form} />

					<Regon form={form} />

					<Notes form={form} />
				</div>
			</form>
		</Form>
	)
}

export default UnitForm
