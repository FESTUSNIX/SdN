'use client'

import { BooleanField } from '@/app/components/Forms/BooleanField'
import { DateField } from '@/app/components/Forms/DateField'
import { EditField } from '@/app/components/Forms/EditField'
import { EditorField } from '@/app/components/Forms/EditorField'
import { DaysOfWeek } from '@/app/components/Forms/Major/DaysOfWeek'
import { KeywordsField } from '@/app/components/Forms/Major/Keywords'
import { QualificationsField } from '@/app/components/Forms/Major/Qualifications'
import { SelectField } from '@/app/components/Forms/SelectField'
import { TextField } from '@/app/components/Forms/TextField'
import { Separator } from '@/app/components/ui/Separator/separator'
import { H3 } from '@/app/components/ui/Typography'
import { DAYS_OF_WEEK_ENUM } from '@/app/constants/daysOfWeek'
import { majorLevelEnum, majorLevelOptions } from '@/app/constants/majorLevel'
import { MAX_KEYWORDS, MAX_KEYWORD_LENGTH } from '@/app/constants/userLimits'
import { MajorPayload, MajorValidator } from '@/lib/validators/major'
import { Major, Qualification } from '@prisma/client'
import { Fragment } from 'react'
import { Control, FieldPath, FieldValues } from 'react-hook-form'
import { z } from 'zod'
import RichTextPreviewField from './RichTextPreviewField'

type Props = {
	major: Major & { qualifications: Pick<Qualification, 'id' | 'name'>[] }
}

export const ManageMajorData = ({ major }: Props) => {
	const {
		name,
		address,
		canPayInInstallments,
		certificates,
		completionConditions,
		keywords,
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
		preparePayload?: <T extends FieldValues, K extends keyof T>(value: T[K]) => any
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
			value: isOnline,
			editComponent: props => BooleanField({ options: ['Online', 'Stacjonarny'], ...props }),
			customComponent: value => (value ? 'Online' : 'Stacjonarny')
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
			editComponent: props => QualificationsField({ control: props.control, accessorKey: props.accessorKey }),
			preparePayload: value => value.map((q: { id: number; name: string }) => q.id)
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
			value: canPayInInstallments,
			editComponent: BooleanField,
			customComponent: value => (value ? 'Tak' : 'Nie')
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
			value: isRegulated,
			editComponent: BooleanField,
			customComponent: value => (value ? 'Tak' : 'Nie')
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
				value.length > 0
					? daysOfWeek.map((day, i, elements) => `${DAYS_OF_WEEK_ENUM[day]}${i !== elements.length - 1 ? ', ' : ''}`)
					: 'Brak danych',
			editComponent: DaysOfWeek
		},
		{
			accessorKey: 'description',
			title: 'Opis',
			value: description,
			customComponent: value => <RichTextPreviewField name='Opis' content={value} />,
			editComponent: props => EditorField({ modalTitle: 'Edytuj opis', placeholder: 'Aa...', ...props })
		},
		{
			accessorKey: 'recruitmentConditions',
			title: 'Wymogi przyjęcia',
			value: recruitmentConditions,
			customComponent: value => <RichTextPreviewField name='Wymogi przyjęcia' content={value} />,
			editComponent: props => EditorField({ modalTitle: 'Edytuj wymogi przyjęcia', placeholder: 'Aa...', ...props })
		},
		{
			accessorKey: 'completionConditions',
			title: 'Wymogi ukończenia',
			value: completionConditions,
			customComponent: value => <RichTextPreviewField name='Wymogi ukończenia' content={value} />,
			editComponent: props => EditorField({ modalTitle: 'Edytuj wymogi ukończenia', placeholder: 'Aa...', ...props })
		},
		{
			accessorKey: 'syllabus',
			title: 'Program nauki',
			value: syllabus,
			customComponent: value => <RichTextPreviewField name='Program nauki' content={value} />,
			editComponent: props => EditorField({ modalTitle: 'Edytuj program nauki', placeholder: 'Aa...', ...props })
		},
		{
			accessorKey: 'keywords',
			title: 'Słowa kluczowe',
			value: keywords,
			customComponent: value => (value.length > 0 ? value.join(', ') : 'Brak danych'),
			editComponent: props => {
				return KeywordsField({
					placeholder: 'Aa, bb, cc',
					maxItemLength: MAX_KEYWORD_LENGTH,
					maxLength: MAX_KEYWORDS,
					setError: props.control?.setError!,
					clearErrors: ((accessorKey: string) =>
						props.control?.setError(props.accessorKey, { type: 'custom', message: '' }, { shouldFocus: false })) as any,
					...props
				})
			}
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
							apiPath={`/api/majors/${major.id}`}
							accessorKey={item.accessorKey}
							defaultValue={item.value}
							PreviewComponent={item.customComponent}
							schema={MajorValidator.extend({
								qualifications: z
									.object({
										id: z.number(),
										name: z.string()
									})
									.array()
									.min(1, {
										message: 'Musisz wybrać conajmniej jedną kwalifikacje'
									})
							})}
							preparePayload={item.preparePayload}
							pathsToRevalidate={[`/manage/majors/${major.slug}`]}
						/>
					</div>

					{i !== items.length - 1 && <Separator />}
				</Fragment>
			))}
		</div>
	)
}
