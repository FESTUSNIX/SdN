'use client'

import { Form } from '@/app/components/ui/Form'
import { Separator } from '@/app/components/ui/Separator/separator'
import { H4, Muted } from '@/app/components/ui/Typography'
import { SubmitHandler } from 'react-hook-form'
import { MajorPayload, MajorFormType } from '@/lib/validators/major'

type Props = {
	form: MajorFormType
	onSubmit: SubmitHandler<MajorPayload>
}

const MajorForm = ({ form, onSubmit }: Props) => {
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(e => onSubmit(e))} className='py-4'>
				<div className='space-y-8 px-6 '></div>

				{/* NAME */}
				{/* MAJOR LEVEL */}
				{/* QUALIFICATIONS */}

				<Separator className='my-12' />

				<div className='space-y-8 px-6'>
					<div>
						<H4>Optional</H4>
						<Muted>These fields are optional and can be filled later</Muted>
					</div>

					{/* COST */}
					{/* ADDRESS */}
					{/* IS REGULATED */}
					{/* CERTIFICATES */}
					{/* COMPLETION CONDITIONS */}
					{/* DAYS OF WEEK */}
					{/* DESCRIPTION */}
					{/* FORM OF STUDY */}
					{/* NUMBER OF SEMESTERS */}
					{/* ORGANISATOR */}
					{/* RECRUITMENT CONDITIONS */}
					{/* SYLLABUS */}
					{/* CAN PAY IN INSTALLMENTS */}
					{/* DURATION IN HOURS */}
					{/* IS ONLINE */}
					{/* ONLINE DURATION */}
					{/* START DATE */}
					{/* END DATE */}
					{/* CONTACT */}
					{/* STATUS */}
				</div>
			</form>
		</Form>
	)
}

export default MajorForm
