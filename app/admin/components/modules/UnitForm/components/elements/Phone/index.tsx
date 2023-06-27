import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/app/components/ui/Form'
import { Input } from '@/app/components/ui/Input'
import React from 'react'
import { form } from '@/lib/validators/unit'

type Props = {
	form: form
}

const Phone = ({ form }: Props) => {
	return (
		<FormField
			control={form.control}
			name='phone'
			render={({ field }) => (
				<FormItem>
					<FormLabel>Phone</FormLabel>
					<FormControl>
						<Input placeholder='+48 123 456 789' {...field} />
					</FormControl>
					<FormDescription>You can also add contact person name</FormDescription>
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}
export default Phone
