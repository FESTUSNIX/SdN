'use client'

import { EditorField } from '@/app/components/Forms/EditorField'
import { SwitchField } from '@/app/components/Forms/SwitchField'
import { TextField } from '@/app/components/Forms/TextField'
import { Form, FormLabel } from '@/app/components/ui/Form'
import { Separator } from '@/app/components/ui/Separator/separator'
import { H4, Muted } from '@/app/components/ui/Typography'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/app/components/ui/Collapsible'
import { MajorFormType, MajorPayload } from '@/lib/validators/major'
import { ChevronsUpDown } from 'lucide-react'
import { SubmitHandler } from 'react-hook-form'
import { DatePicker } from './components/DatePicker'
import DaysOfWeek from './components/DaysOfWeek'
import MajorLevel from './components/MajorLevel'
import Qualifications from './components/Qualifications'
import Status from './components/Status'

type Props = {
	form: MajorFormType
	onSubmit: SubmitHandler<MajorPayload>
}

const MajorForm = ({ form, onSubmit }: Props) => {
	const unitId = form.getValues().unitId

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(e => onSubmit(e))} id='major-form' className='py-4'>
				<div className='space-y-8 px-6'>
					<Collapsible>
						<CollapsibleTrigger asChild>
							<FormLabel className='flex cursor-pointer items-center justify-between'>
								<span className='sr-only'>Toggle</span>
								<span>Unit data</span>
								<ChevronsUpDown className='h-4 w-4' />
							</FormLabel>
						</CollapsibleTrigger>
						<CollapsibleContent>
							<Muted>ID: {unitId}</Muted>
						</CollapsibleContent>
					</Collapsible>

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
					<EditorField
						formControl={form.control}
						accessorKey='completionConditions'
						label='Completion conditions'
						placeholder='Start writing here'
						modalTitle='Add completion conditions'
					/>

					{/* DAYS OF WEEK */}
					<DaysOfWeek formControl={form.control} />

					{/* DESCRIPTION */}
					<EditorField
						formControl={form.control}
						accessorKey='description'
						label='Description'
						placeholder='Start writing here'
						modalTitle='Add major description'
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
					<EditorField
						formControl={form.control}
						accessorKey='recruitmentConditions'
						label='Recruitment conditions'
						placeholder='Start writing here'
						modalTitle='Add recruitment conditions'
					/>

					{/* SYLLABUS */}
					<EditorField
						formControl={form.control}
						accessorKey='syllabus'
						label='Syllabus'
						placeholder='Start writing here'
						modalTitle='Add syllabus'
						description='Program nauki'
					/>

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
