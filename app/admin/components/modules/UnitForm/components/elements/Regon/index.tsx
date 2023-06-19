import React from 'react'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/app/components/elements/Form'
import { Input } from '@/app/components/elements/Input'
import { form } from '@/app/admin/components/modules/UnitForm/FormDefinition'

type Props = {
	form: form
}

const Regon = ({ form }: Props) => {
	return (
		<FormField
			control={form.control}
			name='regon'
			render={({ field }) => (
				<FormItem>
					<FormLabel>Regon</FormLabel>
					<FormControl>
						<Input placeholder='123456789' {...field} maxLength={9} />
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}

export default Regon
