import { FormControl, FormField, FormItem, FormMessage } from '@/app/components/ui/Form'
import { Input } from '@/app/components/ui/Input'
import { PublicUnitFormType } from '@/lib/validators/public-unit'
import FieldTitle from '../FieldTitle'

type Props = {
	form: PublicUnitFormType
}

const Street = ({ form }: Props) => {
	return (
		<FormField
			control={form.control}
			name='street'
			render={({ field }) => (
				<FormItem>
					<FieldTitle form={form} fieldName='street' label='Adres' />
					<FormControl>
						<Input placeholder='Szkolna 12/3' {...field} />
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}

export default Street
