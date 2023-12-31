import { FormControl, FormField, FormItem, FormLabel } from '@/app/components/ui/Form'
import { Switch } from '@/app/components/ui/Switch'
import React from 'react'
import { UnitFormType } from '@/lib/validators/unit'

type Props = {
	form: UnitFormType
}

const IsPublic = ({ form }: Props) => {
	return (
		<FormField
			control={form.control}
			name='isPublic'
			render={({ field }) => (
				<FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
					<div className='space-y-0.5 pr-8'>
						<FormLabel className='text-base'>Is Public</FormLabel>
					</div>
					<FormControl>
						<Switch checked={field.value} onCheckedChange={field.onChange} className='!mt-0' />
					</FormControl>
				</FormItem>
			)}
		/>
	)
}

export default IsPublic
