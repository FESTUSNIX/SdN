import React from 'react'
import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/app/components/elements/Form'
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

const Logo = ({ form }: Props) => {
	return (
		<FormField
			control={form.control}
			name='logo'
			render={({ field }) => (
				<FormItem>
					<FormLabel>Logo</FormLabel>
					<FormControl>
						<Input placeholder='https://my-logo/logo.png' {...field} />
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}

export default Logo
