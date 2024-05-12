'use client'

import { SelectField } from '@/app/components/Forms/SelectField'
import { TextField } from '@/app/components/Forms/TextField'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/app/components/ui/Form'
import { RegisterFormType, RegisterPayload } from '@/lib/validators/register'
import { UserRole } from '@prisma/client'
import { SubmitHandler } from 'react-hook-form'
import { UnitSelect } from '../../../../components/Forms/UnitSelect'

type Props = {
	form: RegisterFormType
	onSubmit: SubmitHandler<RegisterPayload>
}

const roleOptions = [
	...Object.values(UserRole).map(type => {
		const lowerCaseType = type.toLowerCase()
		const label = lowerCaseType.charAt(0).toUpperCase() + lowerCaseType.slice(1)

		return { label: label, value: type }
	})
]

const AccountForm = ({ form, onSubmit }: Props) => {
	const role = form.watch('role')

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(e => onSubmit(e))} className='space-y-6 p-4'>
				<TextField accessorKey='name' label='Name' placeholder='John Doe' />

				<TextField accessorKey='email' label='Email' placeholder='jdoe@gmail.com' type='email' />

				<TextField accessorKey='password' label='Password' placeholder='***********' type='password' />

				<SelectField accessorKey='role' options={roleOptions} label='Role' placeholder='Select user role' />

				{role === 'UNIT' && (
					<FormField
						control={form.control}
						name='unitId'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Unit</FormLabel>
								<FormControl>
									<UnitSelect value={field.value} setValue={field.onChange} placeholder='Select a unit' />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				)}
			</form>
		</Form>
	)
}

export default AccountForm
