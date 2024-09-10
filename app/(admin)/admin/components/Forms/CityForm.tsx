'use client'

import { CustomField } from '@/app/components/Forms/CustomField'
import { DateField } from '@/app/components/Forms/DateField'
import { ImageField } from '@/app/components/Forms/ImageField'
import { TextareaField } from '@/app/components/Forms/TextareaField'
import { TextField } from '@/app/components/Forms/TextField'
import { GalleryField } from '@/app/components/Forms/Unit/Gallery'
import { UnitSelect } from '@/app/components/Forms/UnitSelect'
import { VoivodeshipSelect } from '@/app/components/Forms/VoivodeshipSelect'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/app/components/ui/form'
import { CityFormType, CityPayload } from '@/lib/validators/city'
import { SubmitHandler } from 'react-hook-form'

type Props = {
	form: CityFormType
	onSubmit: SubmitHandler<CityPayload>
}

export const CityForm = ({ form, onSubmit }: Props) => {
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(e => onSubmit(e))} className='space-y-6 p-4'>
				<TextField control={form.control} accessorKey='name' label='Name' placeholder='Aa...' />

				{/* Voivodeship */}
				<CustomField
					control={form.control}
					accessorKey='voivodeship.id'
					label='Voivodeship'
					render={({ field }) => (
						<VoivodeshipSelect value={field.value} setValue={field.onChange} placeholder='Select a voivodeship' />
					)}
				/>

				<TextareaField control={form.control} accessorKey='description' label='Description' placeholder='Aa...' />

				<ImageField control={form.control} accessorKey='image' label='Image' bucket='cities' />
			</form>
		</Form>
	)
}
