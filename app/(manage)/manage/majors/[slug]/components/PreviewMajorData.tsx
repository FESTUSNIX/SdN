import { Separator } from '@/app/components/ui/Separator/separator'
import { H3 } from '@/app/components/ui/Typography'
import { majorLevelEnum } from '@/app/constants/majorLevelEnum'
import { capitalize } from '@/lib/utils/capitalize'
import { Major, Qualification } from '@prisma/client'
import { Fragment } from 'react'
import RichTextField from './RichTextField'

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
		value: React.ReactNode | null
	}[] = [
		{
			title: 'Nazwa',
			value: name
		},
		{
			title: 'Poziom',
			value: majorLevelEnum[majorLevel]
		},
		{
			title: 'Tryb',
			value: isOnline ? 'Online' : 'Stacjonarny'
		},
		{
			title: 'Kwalifikacje',
			value: (
				<>
					{qualifications.map(
						(qualification, i, elements) => `${qualification.name}${i !== elements.length - 1 ? ', ' : ''}`
					)}
				</>
			)
		},
		{
			title: 'Cena',
			value: cost
		},
		{
			title: 'Płatność w ratach',
			value: canPayInInstallments ? 'Tak' : 'Nie'
		},
		{
			title: 'Czas trwania',
			value: durationInHours
		},
		{
			title: 'Liczba semestrów',
			value: numberOfSemesters
		},
		{
			title: 'Zgodne z regulacjami',
			value: isRegulated ? 'Tak' : 'Nie'
		},
		{
			title: 'Data rozpoczęcia',
			value: startDate?.toLocaleDateString()
		},
		{
			title: 'Data zakończenia',
			value: endDate?.toLocaleDateString()
		},
		{
			title: 'Kontakt',
			value: contact
		},
		{
			title: 'Organizator',
			value: organisator
		},
		{
			title: 'Adres',
			value: address
		},
		{
			title: 'Certyfikaty',
			value: certificates
		},
		{
			title: 'Zajęcia odbywają się w dni',
			value: daysOfWeek.length
				? daysOfWeek.map(
						(day, i, elements) => `${capitalize(day.toLowerCase())}${i !== elements.length - 1 ? ', ' : ''}`
				  )
				: null
		},
		{
			title: 'Opis',
			value: <RichTextField name='Opis' content={description} />
		},
		{
			title: 'Wymogi przyjęcia',
			value: <RichTextField name='Wymogi przyjęcia' content={recruitmentConditions} />
		},
		{
			title: 'Wymogi ukończenia',
			value: <RichTextField name='Wymogi ukończenia' content={completionConditions} />
		},
		{
			title: 'Program nauki',
			value: <RichTextField name='Program nauki' content={syllabus} />
		}
	]

	return (
		<div className='space-y-4 rounded-lg border bg-card px-4 py-2.5 text-card-foreground shadow-sm'>
			{items.map((item, i) => (
				<Fragment key={`${item.title}-${item.value}`}>
					<div className='py-2'>
						<H3 className='text-sm font-bold leading-none'>{item.title}</H3>
						<div className='break-all text-muted-foreground'>{item.value || 'Brak danych'}</div>
					</div>

					{i !== items.length - 1 && <Separator />}
				</Fragment>
			))}
		</div>
	)
}

export default PreviewMajorData
