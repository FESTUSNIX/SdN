import React from 'react'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/app/components/elements/Form'
import { form } from '@/app/admin/components/modules/UnitForm/FormDefinition'
import { Input } from '@/app/components/elements/Input'

type Props = {
	form: form
}

const Street = ({ form }: Props) => {
	return (
		<FormField
			control={form.control}
			name='street'
			render={({ field }) => (
				<FormItem>
					<FormLabel>Street</FormLabel>
					<FormControl>
						<Input placeholder='Street 12' {...field} />
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}

export default Street
