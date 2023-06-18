import React from 'react'
import { UseFormReturn } from 'react-hook-form'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/app/components/elements/Form'
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

const Regon = ({ form }: Props) => {
	return (
		<FormField
			control={form.control}
			name='regon'
			render={({ field }) => (
				<FormItem>
					<FormLabel>Regon</FormLabel>
					<FormControl>
						<Input placeholder='123456789' {...field} maxLength={9} />
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}

export default Regon
