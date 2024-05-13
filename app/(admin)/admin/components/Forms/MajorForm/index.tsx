'use client'

import { CustomField } from '@/app/components/Forms/CustomField'
import { DateField } from '@/app/components/Forms/DateField'
import { EditorField } from '@/app/components/Forms/EditorField'
import { KeywordsField } from '@/app/components/Forms/Major/Keywords'
import { MultiSelectField } from '@/app/components/Forms/MultiSelectField'
import { SelectField } from '@/app/components/Forms/SelectField'
import { SwitchField } from '@/app/components/Forms/SwitchField'
import { TextField } from '@/app/components/Forms/TextField'
import { UnitSelect } from '@/app/components/Forms/UnitSelect'
import { Form } from '@/app/components/ui/Form'
import { Separator } from '@/app/components/ui/Separator/separator'
import { H4, Muted } from '@/app/components/ui/Typography'
import { MAX_KEYWORDS, MAX_KEYWORD_LENGTH } from '@/app/constants/userLimits'
import { MajorFormType, MajorPayload } from '@/lib/validators/major'
import { SubmitHandler } from 'react-hook-form'
import { STATUS_OPTIONS } from '../../../constants/statusOptions'
import Qualifications from './components/Qualifications'

type Props = {
	form: MajorFormType
	onSubmit: SubmitHandler<MajorPayload>
}

const MajorForm = ({ form, onSubmit }: Props) => {
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(e => onSubmit(e))} id='major-form' className='py-4'>
				<div className='space-y-8 px-6'>
					<CustomField
						control={form.control}
						accessorKey='unitId'
						label='Unit'
						render={({ field }) => (
							<UnitSelect
								value={field.value.toString()}
								setValue={val => field.onChange(parseInt(val))}
								placeholder='Select a unit'
							/>
						)}
					/>

					<TextField control={form.control} accessorKey='name' label='Name' placeholder='Aa...' />

					<SelectField
						accessorKey='majorLevel'
						options={majorLevelOptions}
						label='Major level'
						placeholder='Select major level'
					/>

					<Qualifications form={form} />

					<SelectField accessorKey='status' options={STATUS_OPTIONS} label='Status' placeholder='Select work status' />
				</div>

				<Separator className='my-12' />

				<div className='space-y-8 px-6'>
					<div>
						<H4>Optional</H4>
						<Muted>These fields are optional and can be filled later</Muted>
					</div>

					{/* KEYWORDS */}
					<KeywordsField
						control={form.control}
						accessorKey='keywords'
						label='Keywords'
						placeholder='Aa, bb, cc'
						maxItemLength={MAX_KEYWORD_LENGTH}
						maxLength={MAX_KEYWORDS}
						setError={form.setError}
						clearErrors={form.clearErrors}
					/>

					{/* IS REGULATED */}
					<SwitchField control={form.control} accessorKey='isRegulated' label='Is regulated' />

					{/* CAN PAY IN INSTALLMENTS */}
					<SwitchField control={form.control} accessorKey='canPayInInstallments' label='Can pay in installments' />

					{/* DURATION IN HOURS */}
					<TextField
						control={form.control}
						accessorKey='durationInHours'
						label='Duration in hours'
						placeholder='12456...'
						type='number'
					/>

					{/* IS ONLINE */}
					<SwitchField control={form.control} accessorKey='isOnline' label='Is online' />

					{/* ONLINE DURATION */}

					{form.watch('isOnline') && (
						<TextField
							control={form.control}
							accessorKey='onlineDuration'
							label='Online duration'
							placeholder='12456...'
							type='number'
						/>
					)}

					{/* COST */}
					<TextField control={form.control} accessorKey='cost' label='Cost' placeholder='12456...' />

					{/* ADDRESS */}
					<TextField control={form.control} accessorKey='address' label='Address' placeholder='Aa...' />

					{/* CERTIFICATES */}
					<TextField control={form.control} accessorKey='certificates' label='Certificates' placeholder='Aa...' />

					{/* COMPLETION CONDITIONS */}
					<EditorField
						control={form.control}
						accessorKey='completionConditions'
						label='Completion conditions'
						placeholder='Start writing here'
						modalTitle='Add completion conditions'
					/>

					{/* DAYS OF WEEK */}
					<MultiSelectField
						control={form.control}
						accessorKey='daysOfWeek'
						label='Days of week'
						placeholder='Select days of week...'
						options={dayOptions}
					/>

					{/* DESCRIPTION */}
					<EditorField
						control={form.control}
						accessorKey='description'
						label='Description'
						placeholder='Start writing here'
						modalTitle='Add major description'
					/>

					{/* FORM OF STUDY */}
					<TextField control={form.control} accessorKey='formOfStudy' label='Form of Study' placeholder='Aa...' />

					{/* NUMBER OF SEMESTERS */}
					<TextField
						control={form.control}
						accessorKey='numberOfSemesters'
						label='Number of semesters'
						placeholder='12456...'
						type='number'
					/>

					{/* ORGANISATOR */}
					<TextField control={form.control} accessorKey='organisator' label='Organisator' placeholder='Aa...' />

					{/* RECRUITMENT CONDITIONS */}
					<EditorField
						control={form.control}
						accessorKey='recruitmentConditions'
						label='Recruitment conditions'
						placeholder='Start writing here'
						modalTitle='Add recruitment conditions'
					/>

					{/* SYLLABUS */}
					<EditorField
						control={form.control}
						accessorKey='syllabus'
						label='Syllabus'
						placeholder='Start writing here'
						modalTitle='Add syllabus'
						description='Program nauki'
					/>

					{/* START DATE */}
					<DateField control={form.control} accessorKey='startDate' label='Start date' />

					{/* END DATE */}
					<DateField control={form.control} accessorKey='endDate' label='End date' />

					{/* CONTACT */}
					<TextField control={form.control} accessorKey='contact' label='Contact' placeholder='Aa...' />
				</div>
			</form>
		</Form>
	)
}

export default MajorForm

const dayOptions = [
	{ label: 'Monday', value: 'MONDAY' },
	{ label: 'Tuesday', value: 'TUESDAY' },
	{ label: 'Wednesday', value: 'WEDNESDAY' },
	{ label: 'Thursday', value: 'THURSDAY' },
	{ label: 'Friday', value: 'FRIDAY' },
	{ label: 'Saturday', value: 'SATURDAY' },
	{ label: 'Sunday', value: 'SUNDAY' }
]

const majorLevelOptions = [
	{ value: 'PODYPLOMOWE', label: 'Podyplomowe' },
	{ value: 'PIERWSZEGO_STOPNIA', label: 'Pierwszego Stopnia' },
	{ value: 'DRUGIEGO_STOPNIA', label: 'Drugiego Stopnia' },
	{ value: 'JEDNOLITE_MAGISTERSKIE', label: 'Jednolite Magisterskie' }
]
