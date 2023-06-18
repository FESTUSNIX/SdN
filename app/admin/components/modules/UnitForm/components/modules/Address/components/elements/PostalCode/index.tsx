import React from 'react'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/app/components/elements/Form'
import { form } from '@/app/admin/components/modules/UnitForm/types/FormType'
import { Input } from '@/app/components/elements/Input'
import ReactInputMask from 'react-input-mask'

type Props = {
	form: form
}

const PostalCode = ({ form }: Props) => {
	return (
		<FormField
			control={form.control}
			name='postalCode'
			render={({ field }) => (
				<FormItem>
					<FormLabel>Postal Code</FormLabel>
					<FormControl>
						<ReactInputMask mask='99-999' maskChar={null} {...field}>
							{/* @ts-ignore */}
							{() => <Input placeholder='01-234' />}
						</ReactInputMask>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}

export default PostalCode
