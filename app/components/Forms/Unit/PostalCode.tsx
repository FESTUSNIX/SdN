import { FormControl, FormField, FormItem, FormMessage } from '@/app/components/ui/Form'
import { Input } from '@/app/components/ui/Input'
import { PublicUnitFormType } from '@/lib/validators/public-unit'
import FieldTitle from '../FieldTitle'

type Props = {
	form: PublicUnitFormType
}

const normalizePostalCode = (value: string) => {
	if (!value[value.length - 1]?.match(/^\d+$/)) return ''

	const str = value.replace('-', '')

	const sliced = [str.slice(0, 2), str.slice(2, 5)]
	if (sliced[0].length !== 2) return value

	return (sliced[0] + '-' + sliced[1]).substring(0, 6)
}

const PostalCode = ({ form }: Props) => {
	return (
		<FormField
			control={form.control}
			name='postalCode'
			render={({ field }) => (
				<FormItem>
					<FieldTitle form={form} fieldName='postalCode' label='Kod pocztowy' />
					<FormControl>
						<Input
							{...field}
							placeholder='12-345'
							autoComplete='postal-code'
							onChange={e => {
								const { value } = e.target
								e.target.value = normalizePostalCode(value)

								field.onChange(e.target.value)
							}}
						/>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}

export default PostalCode
