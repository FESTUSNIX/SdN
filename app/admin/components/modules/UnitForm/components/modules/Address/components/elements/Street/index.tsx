import React from 'react'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/app/components/ui/Form'
import { form } from '@/lib/validators/unit'
import { Input } from '@/app/components/ui/Input'

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
						<Input placeholder='Street 123' {...field} />
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}

export default Street
