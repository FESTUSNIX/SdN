'use client'

import { TextField } from '@/app/components/Forms/TextField'
import { Form } from '@/app/components/ui/Form'
import { Separator } from '@/app/components/ui/Separator/separator'
import { H4, Muted } from '@/app/components/ui/Typography'
import { QualificationFormType, QualificationPayload } from '@/lib/validators/qualification'
import { SubmitHandler } from 'react-hook-form'
import Keywords from './components/Keywords'
import Type from './components/Type'

type Props = {
	form: QualificationFormType
	onSubmit: SubmitHandler<QualificationPayload>
}

const QualificationForm = ({ form, onSubmit }: Props) => {
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(e => onSubmit(e))} className='py-4'>
				<div className='space-y-8 px-6'>
					<TextField formControl={form.control} accessorKey='name' label='Name' placeholder='Aa...' />

					<Type formControl={form.control} />
				</div>

				<Separator className='my-12' />

				<div className='space-y-8 px-6'>
					<div>
						<H4>Optional</H4>
						<Muted>These fields are optional and can be filled later</Muted>
					</div>

					<Keywords form={form} />
				</div>
			</form>
		</Form>
	)
}

export default QualificationForm
