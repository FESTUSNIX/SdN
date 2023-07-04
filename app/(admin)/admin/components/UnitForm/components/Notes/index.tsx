import React from 'react'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/app/components/ui/Form'
import { UnitFormType } from '@/lib/validators/unit'
import { Textarea } from '@/app/components/ui/Textarea/textarea'

type Props = {
	form: UnitFormType
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
