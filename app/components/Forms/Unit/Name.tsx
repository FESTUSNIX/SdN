import { FormControl, FormField, FormItem, FormMessage } from '@/app/components/ui/form'
import { Input } from '@/app/components/ui/input'
import { PublicUnitFormType } from '@/lib/validators/public-unit'
import FieldTitle from '../FieldTitle'

type Props = {
	form: PublicUnitFormType
}

const Name = ({ form }: Props) => {
	return (
		<FormField
			control={form.control}
			name='name'
			render={({ field }) => (
				<FormItem>
					<FieldTitle accessorKey='name' label='Nazwa' />

					<FormControl>
						<Input placeholder='Aa...' {...field} />
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}
export default Name
