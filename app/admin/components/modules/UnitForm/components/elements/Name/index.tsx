import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/app/components/elements/Form'
import { Input } from '@/app/components/elements/Input'
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

const Name = ({ form }: Props) => {
	return (
		<FormField
			control={form.control}
			name='name'
			render={({ field }) => (
				<FormItem>
					<FormLabel>Name</FormLabel>
					<FormControl>
						<Input placeholder='Aa...' {...field} />
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}
export default Name
