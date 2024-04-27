'use client'

import { BooleanField } from '@/app/components/Forms/BooleanField'
import { EditField } from '@/app/components/Forms/EditField'
import { TextField } from '@/app/components/Forms/TextField'
import { City as CityField, PostalCode } from '@/app/components/Forms/Unit'
import { Separator } from '@/app/components/ui/Separator/separator'
import { H3 } from '@/app/components/ui/Typography'
import { UnitPayload, UnitValidator } from '@/lib/validators/unit'
import { City, Unit, UnitAddress } from '@prisma/client'
import React, { Fragment } from 'react'
import { Control, FieldPath, FieldValues } from 'react-hook-form'

type Props = {
	unit: Omit<Unit, 'updatedAt' | 'slug'> & { city: Pick<City, 'id' | 'name'> } & {
		address: Pick<UnitAddress, 'postalCode' | 'street'> | null
	}
}

export const ManageUnitData = ({ unit }: Props) => {
	const { id, name, email, website, city, address, isPublic, phone, nip, regon } = unit

	const items: {
		accessorKey: keyof UnitPayload
		title: string
		value: any
		customComponent?: <T extends FieldValues, K extends keyof T>(value: T[K]) => React.ReactNode
		editComponent: <T extends FieldValues>(props: { accessorKey: FieldPath<T>; control?: Control<T> }) => JSX.Element
	}[] = [
		{
			accessorKey: 'name',
			title: 'Nazwa',
			value: name,
			editComponent: props => TextField({ placeholder: 'Aa...', ...props })
		},
		{
			accessorKey: 'name',
			title: 'Email',
			value: email,
			editComponent: props => TextField({ placeholder: 'jan@kowalski.pl', ...props })
		},
		{
			accessorKey: 'isPublic',
			title: 'Status',
			value: isPublic,
			customComponent: value => (value ? 'Publiczna' : 'Prywatna'),
			editComponent: props => BooleanField({ options: ['Publiczna', 'Prywatna'], ...props })
		},
		{
			accessorKey: 'cityId',
			title: 'Miasto',
			value: city.id,
			customComponent: () => city.name,
			editComponent: props => CityField({ ...props })
		},
		{
			accessorKey: 'website',
			title: 'Strona internetowa',
			value: website,
			editComponent: props => TextField({ placeholder: 'https://uczelnia.pl/', ...props })
		},
		{
			accessorKey: 'postalCode',
			title: 'Kod pocztowy',
			value: address?.postalCode ?? '',
			editComponent: props => PostalCode({ ...props })
		},
		{
			accessorKey: 'street',
			title: 'Adres',
			value: address?.street ?? '',
			editComponent: props => TextField({ placeholder: 'Szkolna 12/3', ...props })
		},
		{
			accessorKey: 'phone',
			title: 'Numer telefonu',
			value: phone,
			editComponent: props => TextField({ placeholder: '+48 123 456 789', ...props })
		},
		{
			accessorKey: 'nip',
			title: 'NIP',
			value: nip,
			editComponent: props => TextField({ placeholder: '1234567890', type: 'number', ...props })
		},
		{
			accessorKey: 'regon',
			title: 'Regon',
			value: regon,
			editComponent: props => TextField({ placeholder: '123456789', type: 'number', ...props })
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
							apiPath={`/api/units/${id}`}
							accessorKey={item.accessorKey}
							defaultValue={item.value}
							PreviewComponent={item.customComponent}
							schema={UnitValidator}
						/>
					</div>

					{i !== items.length - 1 && <Separator />}
				</Fragment>
			))}
		</div>
	)
}
