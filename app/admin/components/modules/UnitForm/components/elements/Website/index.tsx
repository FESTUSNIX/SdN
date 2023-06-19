import React from 'react'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/app/components/elements/Form'
import { Input } from '@/app/components/elements/Input'
import { form } from '@/app/admin/components/modules/UnitForm/FormDefinition'

type Props = {
	form: form
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
