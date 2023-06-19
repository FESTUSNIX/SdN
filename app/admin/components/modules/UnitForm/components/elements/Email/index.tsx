import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/app/components/elements/Form'
import React from 'react'
import { form } from '@/app/admin/components/modules/UnitForm/FormDefinition'
import { Input } from '@/app/components/elements/Input'

type Props = {
	form: form
}

const Email = ({ form }: Props) => {
	return (
		<FormField
			control={form.control}
			name='email'
			render={({ field }) => (
				<FormItem>
					<FormLabel>Email</FormLabel>
					<FormControl>
						<Input placeholder='john@doe.com' type='email' {...field} />
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}

export default Email
