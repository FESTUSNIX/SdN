import { FormControl, FormField, FormItem, FormMessage } from '@/app/components/ui/Form'
import { Input } from '@/app/components/ui/Input'
import { PublicUnitFormType } from '@/lib/validators/public-unit'
import FieldTitle from '../FieldTitle'

type Props = {
	form: PublicUnitFormType
}

const Regon = ({ form }: Props) => {
	return (
		<FormField
			control={form.control}
			name='regon'
			render={({ field }) => (
				<FormItem>
					<FieldTitle accessorKey='regon' label='Regon' />
					<FormControl>
						<Input placeholder='123456789' {...field} maxLength={9} />
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}

export default Regon
