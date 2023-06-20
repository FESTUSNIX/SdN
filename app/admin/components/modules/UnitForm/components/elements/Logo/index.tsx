import React from 'react'
import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/app/components/elements/Form'
import { Input } from '@/app/components/elements/Input'
import { form } from '@/app/admin/components/modules/UnitForm/FormDefinition'

type Props = {
	form: form
}

const Logo = ({ form }: Props) => {
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e?.target?.files?.[0]) return
		form.setValue('logo', e?.target?.files?.[0])
	}

	return (
		<FormField
			control={form.control}
			name='logo'
			render={({ field }) => (
				<FormItem>
					<FormLabel>Logo</FormLabel>
					<FormControl>
						<Input
							placeholder='https://my-logo/logo.png'
							type='file'
							name={field.name}
							ref={field.ref}
							onBlur={field.onBlur}
							value={undefined}
							onChange={handleChange}
						/>
					</FormControl>
					<FormDescription>Max 6MB</FormDescription>
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}

export default Logo
