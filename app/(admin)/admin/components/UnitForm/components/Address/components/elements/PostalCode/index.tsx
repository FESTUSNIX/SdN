import React from 'react'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/app/components/ui/Form'
import { UnitFormType } from '@/lib/validators/unit'
import { Input } from '@/app/components/ui/Input'
import ReactInputMask from 'react-input-mask'

type Props = {
	form: UnitFormType
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
