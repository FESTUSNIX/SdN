import { FormControl, FormField, FormItem, FormMessage } from '@/app/components/ui/Form'
import { Input } from '@/app/components/ui/Input'
import { PublicUnitFormType } from '@/lib/validators/public-unit'
import FieldTitle from '../FieldTitle'

type Props = {
	form: PublicUnitFormType
}

const Email = ({ form }: Props) => {
	return (
		<FormField
			control={form.control}
			name='email'
			render={({ field }) => (
				<FormItem>
					<FieldTitle accessorKey='email' label='Email' />
					<FormControl>
						<Input placeholder='jan@kowalski.pl' type='email' {...field} />
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}

export default Email
