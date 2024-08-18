'use client'

import { SelectField } from '@/app/components/Forms/SelectField'
import { SwitchField } from '@/app/components/Forms/SwitchField'
import { TextField } from '@/app/components/Forms/TextField'
import { TextareaField } from '@/app/components/Forms/TextareaField'
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card'
import { Form } from '@/app/components/ui/form'
import { Separator } from '@/app/components/ui/separator'
import { H4, Muted } from '@/app/components/ui/Typography'
import { UnitFormType, UnitPayload } from '@/lib/validators/unit'
import { SubmitHandler } from 'react-hook-form'
import { WORK_STATUS_OPTIONS } from '../../../../../constants/workStatusOptions'
import City from './components/City'
import Logo from './components/Logo'
import UnitType from './components/UnitType'
import { GalleryField } from '@/app/components/Forms/Unit/Gallery'

type Props = {
	form: UnitFormType
	onSubmit: SubmitHandler<UnitPayload>
}

const UnitForm = ({ form, onSubmit }: Props) => {
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(e => onSubmit(e))} className='py-4'>
				<div className='space-y-8 px-6 '>
					<TextField accessorKey='name' label='Name' placeholder='Aa...' />

					<TextField accessorKey='email' label='Email' placeholder='john@doe.com' type='email' />

					<UnitType form={form} />

					<City form={form} />

					<TextField accessorKey='website' label='Website' placeholder='https://website.pl/' />

					<Logo form={form} />

					<SwitchField accessorKey='isPublic' label='Is public' />

					<SelectField
						accessorKey='workStatus'
						options={WORK_STATUS_OPTIONS}
						label='Work status'
						placeholder='Select work status'
					/>
				</div>

				<Separator className='my-12' />

				<div className='space-y-8 px-6'>
					<div>
						<H4>Optional</H4>
						<Muted>These fields are optional and can be filled later</Muted>
					</div>

					<TextField
						accessorKey='phone'
						label='Phone'
						placeholder='+48 123 456 789'
						description='You can also add contact person name'
					/>

					<Card>
						<CardHeader>
							<CardTitle>Address</CardTitle>
						</CardHeader>
						<CardContent className='flex flex-col gap-6'>
							<TextField accessorKey='street' label='Street' placeholder='Street 123' />

							<TextField accessorKey='postalCode' label='Postal code' placeholder='01-234' />
						</CardContent>
					</Card>

					<TextField accessorKey='nip' label='Nip' placeholder='1234567890' inputProps={{ maxLength: 10 }} />

					<TextField accessorKey='regon' label='Regon' placeholder='123456789' inputProps={{ maxLength: 9 }} />

					<GalleryField accessorKey='gallery' control={form.control} label='Gallery' />

					<TextareaField accessorKey='notes' label='Notes' placeholder='Aa...' />
				</div>
			</form>
		</Form>
	)
}

export default UnitForm
