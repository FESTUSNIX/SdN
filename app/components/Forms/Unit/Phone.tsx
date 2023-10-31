import { FormControl, FormField, FormItem, FormMessage } from '@/app/components/ui/Form'
import { Input } from '@/app/components/ui/Input'
import { PublicUnitFormType } from '@/lib/validators/public-unit'
import FieldTitle from '../FieldTitle'

type Props = {
	form: PublicUnitFormType
}

const Phone = ({ form }: Props) => {
	return (
		<FormField
			control={form.control}
			name='phone'
			render={({ field }) => (
				<FormItem>
					<FieldTitle accessorKey='phone' label='Telefon' />
					<FormControl>
						<Input placeholder='+48 123 456 789' {...field} />
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}
export default Phone
