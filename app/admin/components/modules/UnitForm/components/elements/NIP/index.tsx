import React from 'react'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/app/components/ui/Form'
import { Input } from '@/app/components/ui/Input'
import { form } from '@/lib/validators/unit'

type Props = {
	form: form
}

const NIP = ({ form }: Props) => {
	return (
		<FormField
			control={form.control}
			name='nip'
			render={({ field }) => (
				<FormItem>
					<FormLabel>NIP</FormLabel>
					<FormControl>
						<Input placeholder='1234567890' {...field} maxLength={10} />
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}

export default NIP
