import { BooleanField } from '@/app/components/Forms/BooleanField'
import { DateField } from '@/app/components/Forms/DateField'
import { EditorField } from '@/app/components/Forms/EditorField'
import { DaysOfWeek } from '@/app/components/Forms/Major/DaysOfWeek'
import { KeywordsField } from '@/app/components/Forms/Major/Keywords'
import { QualificationsField } from '@/app/components/Forms/Major/Qualifications'
import { SelectField } from '@/app/components/Forms/SelectField'
import { SwitchField } from '@/app/components/Forms/SwitchField'
import { TextField } from '@/app/components/Forms/TextField'
import { Form } from '@/app/components/ui/Form'
import { Separator } from '@/app/components/ui/Separator/separator'
import { H3, Muted } from '@/app/components/ui/Typography'
import { majorLevelOptions } from '@/app/constants/majorLevel'
import { MAX_KEYWORDS, MAX_KEYWORD_LENGTH } from '@/app/constants/userLimits'
import { MajorFormType, MajorPayload } from '@/lib/validators/major'
import { SubmitHandler } from 'react-hook-form'

type Props = {
	form: MajorFormType
	onSubmit: SubmitHandler<Omit<MajorPayload, 'status'> & { status: boolean }>
}

const MajorForm = ({ form, onSubmit }: Props) => {
	const { control } = form

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(e => onSubmit(e as any))} className='py-4' id='major-form'>
				<div className='space-y-8 px-6'>
					<TextField control={control} accessorKey='name' label='Nazwa' placeholder='np. Informatyka' />

					<SelectField control={control} accessorKey='majorLevel' label='Poziom' options={majorLevelOptions} />

					<BooleanField control={control} accessorKey='isOnline' label='Tryb' options={['Online', 'Stacjonarny']} />

					<QualificationsField accessorKey='qualifications' control={control} label='Kwalifikacje' />

					<SwitchField control={control} accessorKey='status' label='Opublikuj' />
				</div>

				<Separator className='my-12' />

				<div className='space-y-8 px-6'>
					<div>
						<H3>Nieobowiązkowe</H3>
						<Muted>Te pola mogą zostać wypełnione później</Muted>
					</div>

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

					<TextField
						control={control}
						accessorKey='url'
						label='Strona internetowa kierunku'
						placeholder='np. https://studiadlanauczycieli.com/kierunki/1'
					/>

					<TextField control={control} accessorKey='cost' type='number' label='Cena' placeholder='1234...' />

					<BooleanField control={control} accessorKey='canPayInInstallments' label='Płatność w ratach' />

					<TextField
						control={control}
						accessorKey='numberOfSemesters'
						type='number'
						label='Liczba semestrów'
						placeholder='123...'
					/>

					<TextField
						control={control}
						accessorKey='durationInHours'
						type='number'
						label='Czas trwania'
						placeholder='123...'
						description='Podany w godzinach'
					/>

					<DateField control={control} accessorKey='startDate' label='Data rozpoczęcia' />

					<DateField control={control} accessorKey='endDate' label='Data zakończenia' />

					<TextField
						control={control}
						accessorKey='organisator'
						label='Organizator'
						placeholder='np. Organizacja Acme'
						description='Jedynie jeżeli uczelnia nie jest organizatorem'
					/>

					<TextField
						control={control}
						accessorKey='address'
						label='Adres'
						placeholder='np. Studencka 21, 31-116 Kraków'
					/>

					<BooleanField control={control} accessorKey='isRegulated' label='Zgodne z regulacjami' />

					<TextField
						control={control}
						accessorKey='certificates'
						label='Certyfikaty'
						placeholder='np. Cisco, DevOps Fundamentals, ...'
						description='Certyfikaty zapewnione po ukończeniu studiów'
					/>

					<DaysOfWeek control={control} accessorKey='daysOfWeek' label='Zajęcia odbywają się w' />

					<EditorField
						control={control}
						accessorKey='description'
						label='Opis'
						placeholder='Aa...'
						modalTitle='Dodaj opis'
					/>

					<EditorField
						control={control}
						accessorKey='recruitmentConditions'
						label='Wymogi przyjęcia'
						placeholder='Aa...'
						modalTitle='Dodaj wymogi przyjęcia'
					/>

					<EditorField
						control={control}
						accessorKey='completionConditions'
						label='Wymogi ukończenia'
						placeholder='Aa...'
						modalTitle='Dodaj wymogi ukończenia'
					/>

					<EditorField
						control={control}
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
