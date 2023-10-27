import { BooleanField } from '@/app/components/Forms/BooleanField'
import { DateField } from '@/app/components/Forms/DateField'
import { EditorField } from '@/app/components/Forms/EditorField'
import { DaysOfWeek } from '@/app/components/Forms/Major/DaysOfWeek'
import { QualificationsField } from '@/app/components/Forms/Major/Qualifications'
import { SelectField } from '@/app/components/Forms/SelectField'
import { TextField } from '@/app/components/Forms/TextField'
import { Form } from '@/app/components/ui/Form'
import { Separator } from '@/app/components/ui/Separator/separator'
import { H3, Muted } from '@/app/components/ui/Typography'
import { MajorFormType, MajorPayload } from '@/lib/validators/major'
import { SubmitHandler } from 'react-hook-form'

type Props = {
	form: MajorFormType
	onSubmit: SubmitHandler<MajorPayload>
}

const majorLevelOptions = [
	{ value: 'PODYPLOMOWE', label: 'Podyplomowe' },
	{ value: 'PIERWSZEGO_STOPNIA', label: 'Pierwszego Stopnia' },
	{ value: 'DRUGIEGO_STOPNIA', label: 'Drugiego Stopnia' },
	{ value: 'JEDNOLITE_MAGISTERSKIE', label: 'Jednolite Magisterskie' }
]

const MajorForm = ({ form, onSubmit }: Props) => {
	const { control } = form

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(e => onSubmit(e))} className='py-4' id='major-form'>
				<div className='space-y-8 px-6'>
					<TextField formControl={control} accessorKey='name' label='Nazwa' placeholder='np. Informatyka' />

					<SelectField formControl={control} accessorKey='majorLevel' label='Poziom' options={majorLevelOptions} />

					<BooleanField formControl={control} accessorKey='isOnline' label='Tryb' options={['Online', 'Stacjonarny']} />

					<QualificationsField form={form} />
				</div>

				<Separator className='my-12' />

				<div className='space-y-8 px-6'>
					<div>
						<H3>Nieobowiązkowe</H3>
						<Muted>Te pola mogą zostać wypełnione później</Muted>
					</div>

					<TextField formControl={control} accessorKey='cost' type='number' label='Cena' placeholder='1234...' />

					<BooleanField formControl={control} accessorKey='canPayInInstallments' label='Płatność w ratach' />

					<TextField
						formControl={control}
						accessorKey='numberOfSemesters'
						type='number'
						label='Liczba semestrów'
						placeholder='123...'
					/>

					<TextField
						formControl={control}
						accessorKey='durationInHours'
						type='number'
						label='Czas trwania'
						placeholder='123...'
						description='Podany w godzinach'
					/>

					<DateField formControl={control} accessorKey='startDate' label='Data rozpoczęcia' />

					<DateField formControl={control} accessorKey='endDate' label='Data zakończenia' />

					{/* Contact */}
					{/* <TextField formControl={control} accessorKey='contact' label='Kontakt' placeholder='np. Informatyka' /> */}

					<TextField
						formControl={control}
						accessorKey='address'
						label='Adres'
						placeholder='np. Studencka 21, 31-116 Kraków'
					/>

					<TextField
						formControl={control}
						accessorKey='organisator'
						label='Organizator'
						placeholder='np. Organizacja Acme'
						description='Jedynie jeżeli uczelnia nie jest organizatorem'
					/>

					<BooleanField formControl={control} accessorKey='isRegulated' label='Zgodne z regulacjami' />

					<TextField
						formControl={control}
						accessorKey='certificates'
						label='Certyfikaty'
						placeholder='np. Cisco, DevOps Fundamentals, ...'
						description='Certyfikaty zapewnione po ukończeniu studiów'
					/>

					<DaysOfWeek form={form} />

					<EditorField
						formControl={control}
						accessorKey='description'
						label='Opis'
						placeholder='Aa...'
						modalTitle='Dodaj opis'
					/>

					<EditorField
						formControl={control}
						accessorKey='recruitmentConditions'
						label='Wymogi przyjęcia'
						placeholder='Aa...'
						modalTitle='Dodaj wymogi przyjęcia'
					/>

					<EditorField
						formControl={control}
						accessorKey='completionConditions'
						label='Wymogi ukończenia'
						placeholder='Aa...'
						modalTitle='Dodaj wymogi ukończenia'
					/>

					<EditorField
						formControl={control}
						accessorKey='syllabus'
						label='Program nauki'
						placeholder='Aa...'
						modalTitle='Dodaj program nauki'
					/>
				</div>
			</form>
		</Form>
	)
}

export default MajorForm
