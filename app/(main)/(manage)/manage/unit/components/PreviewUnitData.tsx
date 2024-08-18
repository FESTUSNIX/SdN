import { Separator } from '@/app/components/ui/separator'
import { H3 } from '@/app/components/ui/Typography'
import { City, Unit, UnitAddress } from '@prisma/client'
import { Fragment } from 'react'

type Props = {
	unit: Pick<Unit, 'name' | 'email' | 'unitType' | 'website' | 'isPublic' | 'phone' | 'nip' | 'regon'> & {
		city: Pick<City, 'name'>
		address: Pick<UnitAddress, 'postalCode' | 'street'> | null
	}
}

const PreviewUnitData = ({ unit }: Props) => {
	const items: {
		title: string
		value: string | null
	}[] = [
		{
			title: 'Nazwa',
			value: unit.name
		},
		{
			title: 'Email',
			value: unit.email
		},
		{
			title: 'Typ jednostki',
			value: unit.unitType
		},
		{
			title: 'Strona internetowa',
			value: unit.website
		},
		{
			title: 'Miasto',
			value: unit.city.name
		},
		{
			title: 'Kod pocztowy',
			value: unit.address?.postalCode ?? null
		},
		{
			title: 'Adres',
			value: unit.address?.street ?? null
		},
		{
			title: 'Status',
			value: unit.isPublic ? 'Publiczna' : 'Prywatna'
		},
		{
			title: 'Telefon kontaktowy',
			value: unit.phone
		},
		{
			title: 'NIP',
			value: unit.nip
		},
		{
			title: 'Regon',
			value: unit.regon
		}
	]

	return (
		<div className='space-y-4 rounded-lg border bg-card px-4 py-2.5 text-card-foreground shadow-sm'>
			{items.map((item, i) => (
				<Fragment key={`${item.title}-${item.value}`}>
					<div className='py-2'>
						<H3 className='text-sm font-bold leading-none'>{item.title}</H3>
						<p className='break-all text-muted-foreground'>{item.value ?? 'Brak danych'}</p>
					</div>

					{i !== items.length - 1 && <Separator />}
				</Fragment>
			))}
		</div>
	)
}

export default PreviewUnitData
