import React from 'react'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/app/components/elements/Form'
import { UseFormReturn } from 'react-hook-form'
import { Input } from '@/app/components/elements/Input'

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

const Website = ({ form }: Props) => {
	return (
		<FormField
			control={form.control}
			name='website'
			render={({ field }) => (
				<FormItem>
					<FormLabel>Website</FormLabel>
					<FormControl>
						<Input placeholder='https://website.pl/' {...field} />
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}

export default Website
