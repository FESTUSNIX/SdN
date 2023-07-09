import { FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/app/components/ui/Form'
import { Control } from 'react-hook-form'
import { Switch } from '../../ui/Switch'

type Props = {
	formControl: Control<any>
	accessorKey: string
	label: string
	description?: string
}

export const SwitchField = ({ formControl, label, accessorKey, description }: Props) => {
	return (
		<FormField
			control={formControl}
			name={accessorKey}
			render={({ field }) => (
				<FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
					<div className='space-y-0.5 pr-8'>
						<FormLabel className='text-base'>{label}</FormLabel>
						{description && <FormDescription>{description}</FormDescription>}
					</div>
					<FormControl>
						<Switch checked={field.value} onCheckedChange={field.onChange} className='!mt-0' />
					</FormControl>
				</FormItem>
			)}
		/>
	)
}
