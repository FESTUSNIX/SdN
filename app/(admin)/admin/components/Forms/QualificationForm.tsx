'use client'

import { SelectField } from '@/app/components/Forms/SelectField'
import { TextArrayField } from '@/app/components/Forms/TextArrayField'
import { TextField } from '@/app/components/Forms/TextField'
import { Form } from '@/app/components/ui/Form'
import { Separator } from '@/app/components/ui/Separator/separator'
import { H4, Muted } from '@/app/components/ui/Typography'
import { QualificationFormType, QualificationPayload } from '@/lib/validators/qualification'
import { QualificationType } from '@prisma/client'
import { SubmitHandler } from 'react-hook-form'

type Props = {
	form: QualificationFormType
	onSubmit: SubmitHandler<QualificationPayload>
}

const typeOptions = [
	...Object.values(QualificationType).map(type => {
		const lowerCaseType = type.toLowerCase()
		const label = lowerCaseType.charAt(0).toUpperCase() + lowerCaseType.slice(1)

		return { label: label, value: type }
	})
]

const QualificationForm = ({ form, onSubmit }: Props) => {
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(e => onSubmit(e))} className='py-4'>
				<div className='space-y-8 px-6'>
					<TextField control={form.control} accessorKey='name' label='Name' placeholder='Aa...' />

					<SelectField accessorKey='type' placeholder='Select qualification type' label='Type' options={typeOptions} />
				</div>

				<Separator className='my-12' />

				<div className='space-y-8 px-6'>
					<div>
						<H4>Optional</H4>
						<Muted>These fields are optional and can be filled later</Muted>
					</div>

					<TextArrayField accessorKey='keywords' placeholder='Add a new keyword' label='Keywords' />
				</div>
			</form>
		</Form>
	)
}

export default QualificationForm
