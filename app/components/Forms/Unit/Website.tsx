import { FormControl, FormField, FormItem, FormMessage } from '@/app/components/ui/form'
import { Input } from '@/app/components/ui/input'
import { PublicUnitFormType } from '@/lib/validators/public-unit'
import FieldTitle from '../FieldTitle'

type Props = {
	form: PublicUnitFormType
}

const Website = ({ form }: Props) => {
	return (
		<FormField
			control={form.control}
			name='website'
			render={({ field }) => (
				<FormItem>
					<FieldTitle accessorKey='website' label='Strona internetowa' />
					<FormControl>
						<Input placeholder='https://website.pl/' {...field} />
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}

export default Website
