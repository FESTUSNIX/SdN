'use client'

import { DateField } from '@/app/components/Forms/DateField'
import { TextField } from '@/app/components/Forms/TextField'
import { UnitSelect } from '@/app/components/Forms/UnitSelect'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/app/components/ui/form'
import { SubscriptionPayload, SubscriptionFormType } from '@/lib/validators/subscription'
import { SubmitHandler } from 'react-hook-form'

type Props = {
	form: SubscriptionFormType
	onSubmit: SubmitHandler<SubscriptionPayload>
}

export const SubscriptionForm = ({ form, onSubmit }: Props) => {
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(e => onSubmit(e))} className='space-y-6 p-4'>
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

				<TextField control={form.control} accessorKey='type' label='Type' placeholder='Aa...' />

				<DateField control={form.control} accessorKey='from' label='From' />

				<DateField control={form.control} accessorKey='to' label='To' />
			</form>
		</Form>
	)
}
