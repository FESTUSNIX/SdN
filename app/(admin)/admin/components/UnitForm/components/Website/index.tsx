import React from 'react'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/app/components/ui/Form'
import { Input } from '@/app/components/ui/Input'
import { UnitFormType } from '@/lib/validators/unit'

type Props = {
	form: UnitFormType
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
