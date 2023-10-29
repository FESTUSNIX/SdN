'use client'

import { BooleanField } from '@/app/components/Forms/BooleanField'
import { DateField } from '@/app/components/Forms/DateField'
import { EditorField } from '@/app/components/Forms/EditorField'
import { DaysOfWeek } from '@/app/components/Forms/Major/DaysOfWeek'
import { QualificationsField } from '@/app/components/Forms/Major/Qualifications'
import { SelectField } from '@/app/components/Forms/SelectField'
import { TextField } from '@/app/components/Forms/TextField'
import { Separator } from '@/app/components/ui/Separator/separator'
import { H3 } from '@/app/components/ui/Typography'
import { majorLevelEnum, majorLevelOptions } from '@/app/constants/majorLevel'
import { capitalize } from '@/lib/utils/capitalize'
import { MajorPayload, MajorValidator } from '@/lib/validators/major'
import { Major, Qualification } from '@prisma/client'
import { Fragment } from 'react'
import { Control, FieldPath, FieldValues } from 'react-hook-form'
import { EditField } from './EditField'
import RichTextField from './RichTextField'

type Props = {
	major: Major & { qualifications: Pick<Qualification, 'id' | 'name'>[] }
}

const PreviewMajorData = ({ major }: Props) => {
	const {
		name,
		address,
		canPayInInstallments,
		certificates,
		completionConditions,
		contact,
		cost,
		daysOfWeek,
		description,
		durationInHours,
		endDate,
		isOnline,
		isRegulated,
		majorLevel,
		numberOfSemesters,
		organisator,
		recruitmentConditions,
		startDate,
		syllabus,
		qualifications
	} = major

	const items: {
		accessorKey: keyof MajorPayload
		title: string
		value: any
		customComponent?: <T extends FieldValues, K extends keyof T>(value: T[K]) => React.ReactNode
		editComponent: <T extends FieldValues>(props: { accessorKey: FieldPath<T>; control?: Control<T> }) => JSX.Element
	}[] = [
		{
			accessorKey: 'name',
			title: 'Nazwa',
			value: name,
			editComponent: props => TextField({ placeholder: 'np. Informatyka', ...props })
		},
		{
			accessorKey: 'majorLevel',
			title: 'Poziom',
			value: majorLevel,
			customComponent: value => majorLevelEnum[value],
			editComponent: props => SelectField({ options: majorLevelOptions, ...props })
		},
		{
			accessorKey: 'isOnline',
			title: 'Tryb',
			value: isOnline ? 'Online' : 'Stacjonarny',
			editComponent: props => BooleanField({ options: ['Online', 'Stacjonarny'], ...props })
		},
		{
			accessorKey: 'qualifications',
			title: 'Kwalifikacje',
			value: qualifications,
			customComponent: value => (
				<>
					{value.map(
						(qualification: { id: number; name: string }, i: number, elements: { id: number; name: string }[]) =>
							`${qualification.name}${i !== elements.length - 1 ? ', ' : ''}`
					)}
				</>
			),
			editComponent: QualificationsField
		},
		{
			accessorKey: 'cost',
			title: 'Cena',
			value: cost,
			editComponent: props => TextField({ placeholder: '1234...', type: 'number', ...props })
		},
		{
			accessorKey: 'canPayInInstallments',
			title: 'Płatność w ratach',
			value: canPayInInstallments ? 'Tak' : 'Nie',
			editComponent: BooleanField
		},
		{
			accessorKey: 'durationInHours',
			title: 'Czas trwania',
			value: durationInHours,
			editComponent: props =>
				TextField({ placeholder: '123...', type: 'number', description: 'Podany w godzinach', ...props })
		},
		{
			accessorKey: 'numberOfSemesters',
			title: 'Liczba semestrów',
			value: numberOfSemesters,
			editComponent: props => TextField({ placeholder: '12...', type: 'number', ...props })
		},
		{
			accessorKey: 'isRegulated',
			title: 'Zgodne z regulacjami',
			value: isRegulated ? 'Tak' : 'Nie',
			editComponent: BooleanField
		},
		{
			accessorKey: 'startDate',
			title: 'Data rozpoczęcia',
			value: startDate,
			customComponent: value => value?.toLocaleDateString('pl'),
			editComponent: DateField
		},
		{
			accessorKey: 'endDate',
			title: 'Data zakończenia',
			value: endDate,
			customComponent: value => value?.toLocaleDateString('pl'),
			editComponent: DateField
		},
		{
			accessorKey: 'organisator',
			title: 'Organizator',
			value: organisator,
			editComponent: props =>
				TextField({
					placeholder: 'np. Organizacja Acme',
					description: 'Jedynie jeżeli uczelnia nie jest organizatorem',
					...props
				})
		},
		{
			accessorKey: 'address',
			title: 'Adres',
			value: address,
			editComponent: props => TextField({ placeholder: 'np. Studencka 21, 31-116 Kraków', ...props })
		},
		{
			accessorKey: 'certificates',
			title: 'Certyfikaty',
			value: certificates,
			editComponent: props =>
				TextField({
					placeholder: 'np. Cisco, DevOps Fundamentals, ...',
					description: 'Certyfikaty zapewnione po ukończeniu studiów',
					...props
				})
		},
		{
			accessorKey: 'daysOfWeek',
			title: 'Zajęcia odbywają się w dni',
			value: daysOfWeek,
			customComponent: value =>
				value.length
					? daysOfWeek.map(
							(day, i, elements) => `${capitalize(day.toLowerCase())}${i !== elements.length - 1 ? ', ' : ''}`
					  )
					: null,
			editComponent: DaysOfWeek
		},
		{
			accessorKey: 'description',
			title: 'Opis',
			value: description,
			customComponent: value => <RichTextField name='Opis' content={value} />,
			editComponent: props => EditorField({ modalTitle: 'Edytuj opis', placeholder: 'Aa...', ...props })
		},
		{
			accessorKey: 'recruitmentConditions',
			title: 'Wymogi przyjęcia',
			value: recruitmentConditions,
			customComponent: value => <RichTextField name='Wymogi przyjęcia' content={value} />,
			editComponent: props => EditorField({ modalTitle: 'Edytuj wymogi przyjęcia', placeholder: 'Aa...', ...props })
		},
		{
			accessorKey: 'completionConditions',
			title: 'Wymogi ukończenia',
			value: completionConditions,
			customComponent: value => <RichTextField name='Wymogi ukończenia' content={value} />,
			editComponent: props => EditorField({ modalTitle: 'Edytuj wymogi ukończenia', placeholder: 'Aa...', ...props })
		},
		{
			accessorKey: 'syllabus',
			title: 'Program nauki',
			value: syllabus,
			customComponent: value => <RichTextField name='Program nauki' content={value} />,
			editComponent: props => EditorField({ modalTitle: 'Edytuj program nauki', placeholder: 'Aa...', ...props })
		}
	]

	return (
		<div className='space-y-4 rounded-lg border bg-card px-4 py-2.5 text-card-foreground shadow-sm'>
			{items.map((item, i) => (
				<Fragment key={`${item.title}-${item.value}`}>
					<div className='grid grid-cols-2 grid-rows-[auto_auto] py-2'>
						<H3 className='text-sm font-bold leading-none'>{item.title}</H3>

						<EditField
							FormFieldComp={item.editComponent}
							majorId={major.id}
							accessorKey={item.accessorKey}
							defaultValue={item.value}
							PreviewComponent={item.customComponent}
							schema={MajorValidator}
						/>
					</div>

					{i !== items.length - 1 && <Separator />}
				</Fragment>
			))}
		</div>
	)
}

export default PreviewMajorData
