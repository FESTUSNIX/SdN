import { Separator } from '@/app/components/ui/Separator/separator'
import { H3 } from '@/app/components/ui/Typography'
import { majorLevelEnum } from '@/app/constants/majorLevelEnum'
import { capitalize } from '@/lib/utils/capitalize'
import { Major, Qualification } from '@prisma/client'
import { ForwardRefExoticComponent, Fragment } from 'react'
import { ControllerRenderProps } from 'react-hook-form'
import { EditField } from './EditField'
import RichTextField from './RichTextField'
import { TestFieldEdit } from './TestFieldEdit'

type Props = {
	major: Omit<Major, ''> & { qualifications: Pick<Qualification, 'id' | 'name'>[] }
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
		title: string
		value: any
		customComponent?: React.ReactNode
		editComp: ForwardRefExoticComponent<Omit<ControllerRenderProps, 'ref'>>
	}[] = [
		{
			title: 'Nazwa',
			value: name,
			editComp: TestFieldEdit
		},
		{
			title: 'Poziom',
			value: majorLevelEnum[majorLevel],
			editComp: TestFieldEdit
		},
		{
			title: 'Tryb',
			value: isOnline ? 'Online' : 'Stacjonarny',
			editComp: TestFieldEdit
		},
		{
			title: 'Kwalifikacje',
			value: qualifications,
			customComponent: (
				<>
					{qualifications.map(
						(qualification, i, elements) => `${qualification.name}${i !== elements.length - 1 ? ', ' : ''}`
					)}
				</>
			),
			editComp: TestFieldEdit
		},
		{
			title: 'Cena',
			value: cost,
			editComp: TestFieldEdit
		},
		{
			title: 'Płatność w ratach',
			value: canPayInInstallments ? 'Tak' : 'Nie',
			editComp: TestFieldEdit
		},
		{
			title: 'Czas trwania',
			value: durationInHours,
			editComp: TestFieldEdit
		},
		{
			title: 'Liczba semestrów',
			value: numberOfSemesters,
			editComp: TestFieldEdit
		},
		{
			title: 'Zgodne z regulacjami',
			value: isRegulated ? 'Tak' : 'Nie',
			editComp: TestFieldEdit
		},
		{
			title: 'Data rozpoczęcia',
			value: startDate?.toLocaleDateString(),
			editComp: TestFieldEdit
		},
		{
			title: 'Data zakończenia',
			value: endDate?.toLocaleDateString(),
			editComp: TestFieldEdit
		},
		{
			title: 'Kontakt',
			value: contact,
			editComp: TestFieldEdit
		},
		{
			title: 'Organizator',
			value: organisator,
			editComp: TestFieldEdit
		},
		{
			title: 'Adres',
			value: address,
			editComp: TestFieldEdit
		},
		{
			title: 'Certyfikaty',
			value: certificates,
			editComp: TestFieldEdit
		},
		{
			title: 'Zajęcia odbywają się w dni',
			value: daysOfWeek.length
				? daysOfWeek.map(
						(day, i, elements) => `${capitalize(day.toLowerCase())}${i !== elements.length - 1 ? ', ' : ''}`
				  )
				: null,
			editComp: TestFieldEdit
		},
		{
			title: 'Opis',
			value: <RichTextField name='Opis' content={description} />,
			editComp: TestFieldEdit
		},
		{
			title: 'Wymogi przyjęcia',
			value: <RichTextField name='Wymogi przyjęcia' content={recruitmentConditions} />,
			editComp: TestFieldEdit
		},
		{
			title: 'Wymogi ukończenia',
			value: <RichTextField name='Wymogi ukończenia' content={completionConditions} />,
			editComp: TestFieldEdit
		},
		{
			title: 'Program nauki',
			value: <RichTextField name='Program nauki' content={syllabus} />,
			editComp: TestFieldEdit
		}
	]

	return (
		<div className='space-y-4 rounded-lg border bg-card px-4 py-2.5 text-card-foreground shadow-sm'>
			{items.map((item, i) => (
				<Fragment key={`${item.title}-${item.value}`}>
					<div className='grid grid-cols-2 grid-rows-[auto_auto] py-2'>
						<H3 className='text-sm font-bold leading-none'>{item.title}</H3>

						<EditField
							accessorKey='name'
							defaultValue={item.value}
							Component={item.editComp}
							previewComponent={item.customComponent}
						/>
					</div>

					{i !== items.length - 1 && <Separator />}
				</Fragment>
			))}
		</div>
	)
}

export default PreviewMajorData
