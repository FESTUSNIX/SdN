'use client'

import { BooleanField } from '@/app/components/Forms/BooleanField'
import { EditField } from '@/app/components/Forms/EditField'
import { TextField } from '@/app/components/Forms/TextField'
import { City as CityField, PostalCode } from '@/app/components/Forms/Unit'
import { GalleryField } from '@/app/components/Forms/Unit/Gallery'
import { UploadedFiles } from '@/app/components/GalleryPanel/UploadedFiles'
import { PlaceholderImage } from '@/app/components/PlaceholderImage'
import { Separator } from '@/app/components/ui/separator'
import { H3 } from '@/app/components/ui/Typography'
import { deleteFilesFromSupabase } from '@/lib/supabase/deleteFiles'
import { urlFor } from '@/lib/supabase/getUrlFor'
import { uploadFileToSupabase } from '@/lib/supabase/uploadImage'
import { handleGallery } from '@/lib/utils/gallery'
import { UnitPayload, UnitValidator } from '@/lib/validators/unit'
import { City, Unit, UnitAddress } from '@prisma/client'
import Image from 'next/image'
import React, { Fragment } from 'react'
import { Control, FieldPath, FieldValues } from 'react-hook-form'
import { LogoField } from './LogoField'

type Props = {
	unit: Omit<Unit, 'updatedAt' | 'slug'> & { city: Pick<City, 'id' | 'name'> } & {
		address: Pick<UnitAddress, 'postalCode' | 'street'> | null
	}
}

export const ManageUnitData = ({ unit }: Props) => {
	const { id, name, email, website, city, address, isPublic, phone, nip, regon, logo, gallery } = unit

	const handleImageUpdate = async (newLogo: UnitPayload['logo'], previousLogo: UnitPayload['logo'], unitId: number) => {
		let filepath = previousLogo

		if (previousLogo !== null && newLogo !== previousLogo) {
			await deleteFilesFromSupabase('units', [`${unitId}/unit-logo`])
			filepath = null
		}

		if (newLogo !== null && newLogo !== previousLogo) {
			filepath = await uploadFileToSupabase('units', newLogo, `${unitId}/unit-logo?t=${new Date().toString()}`)
		}

		return filepath
	}

	const items: {
		accessorKey: keyof UnitPayload
		title: string
		value: any
		customComponent?: <T extends FieldValues, K extends keyof T>(value: T[K]) => React.ReactNode
		editComponent: <T extends FieldValues>(props: { accessorKey: FieldPath<T>; control?: Control<T> }) => JSX.Element
		preparePayload?: (value: any) => Promise<any> | any
		readOnly?: boolean
	}[] = [
		{
			accessorKey: 'logo',
			title: 'Logo',
			value: logo,
			editComponent: props => LogoField(),
			customComponent: value =>
				value ? (
					<Image
						src={urlFor('units', value).publicUrl ?? ''}
						alt='Logo uczelni'
						width={400}
						height={400}
						className='mt-2 size-32 rounded-lg border object-cover'
					/>
				) : (
					<PlaceholderImage className='mt-2 w-32 rounded-lg border' label='Logo uczelni' />
				),
			preparePayload: async value => {
				const newLogo = value as File
				const previousLogo = logo

				const filepath = await handleImageUpdate(newLogo, previousLogo, id)

				return filepath
			}
		},
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
			accessorKey: 'gallery',
			title: 'Galeria zdjęć',
			value: gallery,
			editComponent: props => GalleryField({ ...props }),
			customComponent: value => {
				const images = value?.map((img: any) => ({ src: urlFor('units', img.url).publicUrl, alt: img.alt }))
				return (
					<div className='mt-2'>
						<UploadedFiles uploadedImages={images ?? []} hoverEffect={false} />
					</div>
				)
			},
			preparePayload: async value => {
				const newGallery = await handleGallery(id, value, gallery as any)
				return newGallery
			}
		},
		{
			accessorKey: 'nip',
			title: 'NIP',
			value: nip,
			editComponent: props => TextField({ placeholder: '1234567890', type: 'number', ...props }),
			readOnly: true
		},
		{
			accessorKey: 'regon',
			title: 'Regon',
			value: regon,
			editComponent: props => TextField({ placeholder: '123456789', type: 'number', ...props }),
			readOnly: true
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
							preparePayload={item.preparePayload}
							readOnly={item.readOnly}
						/>
					</div>

					{i !== items.length - 1 && <Separator />}
				</Fragment>
			))}
		</div>
	)
}
