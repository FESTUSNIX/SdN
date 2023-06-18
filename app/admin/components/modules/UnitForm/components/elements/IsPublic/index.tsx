import { FormControl, FormField, FormItem, FormLabel } from '@/app/components/elements/Form'
import { Switch } from '@/app/components/elements/Switch'
import React from 'react'
import { UseFormReturn } from 'react-hook-form'

type Props = {
	form: UseFormReturn<
		{
			name: string
			logo: string
			isPublic: boolean
			unitType: 'uczelnia' | 'placówka doskonalenia nauczycieli' | 'inna'
			otherUnitType: string
			website: string
			street: string
			postalCode: string
			cityId: number
			nip?: string | undefined
			regon?: string | undefined
		},
		any,
		undefined
	>
}

const IsPublic = ({ form }: Props) => {
	return (
		<FormField
			control={form.control}
			name='isPublic'
			render={({ field }) => (
				<FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
					<div className='space-y-0.5 pr-8'>
						<FormLabel className='text-base'>Is Public</FormLabel>
					</div>
					<FormControl>
						<Switch checked={field.value} onCheckedChange={field.onChange} className='!mt-0' />
					</FormControl>
				</FormItem>
			)}
		/>
	)
}

export default IsPublic
