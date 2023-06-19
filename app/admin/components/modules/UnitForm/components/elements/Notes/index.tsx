import React from 'react'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/app/components/elements/Form'
import { form } from '@/app/admin/components/modules/UnitForm/FormDefinition'
import { Textarea } from '@/app/components/elements/Textarea/textarea'

type Props = {
	form: form
}

const Notes = ({ form }: Props) => {
	return (
		<FormField
			control={form.control}
			name='notes'
			render={({ field }) => (
				<FormItem>
					<FormLabel>Notes</FormLabel>
					<FormControl>
						<Textarea placeholder='Aa...' {...field} />
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}

export default Notes
