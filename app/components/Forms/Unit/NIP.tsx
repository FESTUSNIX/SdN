import { FormControl, FormField, FormItem, FormMessage } from '@/app/components/ui/Form'
import { Input } from '@/app/components/ui/Input'
import { PublicUnitFormType } from '@/lib/validators/public-unit'
import FieldTitle from '../FieldTitle'

type Props = {
	form: PublicUnitFormType
}

const NIP = ({ form }: Props) => {
	return (
		<FormField
			control={form.control}
			name='nip'
			render={({ field }) => (
				<FormItem>
					<FieldTitle accessorKey='nip' label='NIP' />
					<FormControl>
						<Input placeholder='1234567890' {...field} maxLength={10} />
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}

export default NIP
