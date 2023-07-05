import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/app/components/ui/Form'
import { Input } from '@/app/components/ui/Input'
import React from 'react'
import { MajorFormType } from '@/lib/validators/major'

type Props = {
	form: MajorFormType
}

const Name = ({ form }: Props) => {
	return (
		<FormField
			control={form.control}
			name='name'
			render={({ field }) => (
				<FormItem>
					<FormLabel>Name</FormLabel>
					<FormControl>
						<Input placeholder='Aa...' {...field} />
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}
export default Name
