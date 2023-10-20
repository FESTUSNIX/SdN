import { FormControl, FormField, FormItem, FormLabel } from '@/app/components/ui/Form'
import { Switch } from '@/app/components/ui/Switch'
import { cn } from '@/lib/utils/utils'
import { PublicUnitFormType } from '@/lib/validators/public-unit'

type Props = {
	form: PublicUnitFormType
}

const IsPublic = ({ form }: Props) => {
	return (
		<FormField
			control={form.control}
			name='isPublic'
			render={({ field }) => (
				<FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
					<div className={cn('space-y-0.5 pr-8')}>
						<FormLabel className='text-base'>Placówka publiczna</FormLabel>
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
