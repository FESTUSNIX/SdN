'use client'

import { SwitchField } from '@/app/components/Forms/SwitchField'
import { TextField } from '@/app/components/Forms/TextField'
import { Form } from '@/app/components/ui/Form'
import { Separator } from '@/app/components/ui/Separator/separator'
import { H4, Muted } from '@/app/components/ui/Typography'
import { MajorFormType, MajorPayload } from '@/lib/validators/major'
import { SubmitHandler } from 'react-hook-form'
import MajorLevel from './components/MajorLevel'
import Qualifications from './components/Qualifications'
import Status from './components/Status'
import DaysOfWeek from './components/DaysOfWeek'
import { DatePicker } from './components/DatePicker'

type Props = {
	form: MajorFormType
	onSubmit: SubmitHandler<Omit<MajorPayload, 'unitSlug'>>
}

const MajorForm = ({ form, onSubmit }: Props) => {
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(e => onSubmit(e))} className='py-4'>
				<div className='space-y-8 px-6'>
					<TextField formControl={form.control} accessorKey='name' label='Name' placeholder='Aa...' />

					<MajorLevel form={form} />

					<Qualifications form={form} />

					<Status form={form} />
				</div>

				<Separator className='my-12' />

				<div className='space-y-8 px-6'>
					<div>
						<H4>Optional</H4>
						<Muted>These fields are optional and can be filled later</Muted>
					</div>

					{/* IS REGULATED */}
					<SwitchField formControl={form.control} accessorKey='isRegulated' label='Is regulated' />

					{/* CAN PAY IN INSTALLMENTS */}
					<SwitchField formControl={form.control} accessorKey='canPayInInstallments' label='Can pay in installments' />

					{/* DURATION IN HOURS */}
					<TextField
						formControl={form.control}
						accessorKey='durationInHours'
						label='Duration in hours'
						placeholder='12456...'
						nullable
					/>

					{/* IS ONLINE */}
					<SwitchField formControl={form.control} accessorKey='isOnline' label='Is online' />

					{/* ONLINE DURATION */}

					{form.watch('isOnline') && (
						<TextField
							formControl={form.control}
							accessorKey='onlineDuration'
							label='Online duration'
							placeholder='12456...'
							nullable
						/>
					)}

					{/* COST */}
					<TextField formControl={form.control} accessorKey='cost' label='Cost' placeholder='12456...' nullable />

					{/* ADDRESS */}
					<TextField formControl={form.control} accessorKey='address' label='Address' placeholder='Aa...' />

					{/* CERTIFICATES */}
					<TextField formControl={form.control} accessorKey='certificates' label='Certificates' placeholder='Aa...' />

					{/* COMPLETION CONDITIONS */}
					<TextField
						formControl={form.control}
						accessorKey='completionConditions'
						label='Completion conditions'
						placeholder='Aa...'
						textarea
					/>

					{/* DAYS OF WEEK */}
					<DaysOfWeek formControl={form.control} />

					{/* DESCRIPTION */}
					<TextField
						formControl={form.control}
						accessorKey='description'
						label='Description'
						placeholder='Aa...'
						textarea
					/>

					{/* FORM OF STUDY */}
					<TextField formControl={form.control} accessorKey='formOfStudy' label='Form of Study' placeholder='Aa...' />

					{/* NUMBER OF SEMESTERS */}
					<TextField
						formControl={form.control}
						accessorKey='numberOfSemesters'
						label='Number of semesters'
						placeholder='12456...'
						nullable
					/>

					{/* ORGANISATOR */}
					<TextField formControl={form.control} accessorKey='organisator' label='Organisator' placeholder='Aa...' />

					{/* RECRUITMENT CONDITIONS */}
					<TextField
						formControl={form.control}
						accessorKey='recruitmentConditions'
						label='Recruitment conditions'
						placeholder='Aa...'
						textarea
					/>

					{/* SYLLABUS */}
					<TextField formControl={form.control} accessorKey='syllabus' label='Syllabus' placeholder='Aa...' textarea />

					{/* START DATE */}
					<DatePicker formControl={form.control} accessorKey='startDate' label='Start date' />

					{/* END DATE */}
					<DatePicker formControl={form.control} accessorKey='endDate' label='End date' />

					{/* CONTACT */}
					<TextField formControl={form.control} accessorKey='contact' label='Contact' placeholder='Aa...' />
				</div>
			</form>
		</Form>
	)
}

export default MajorForm
