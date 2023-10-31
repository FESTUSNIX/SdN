import { FormControl, FormField, FormItem, FormMessage } from '@/app/components/ui/Form'
import { Input } from '@/app/components/ui/Input'
import { Control, FieldPath, FieldValues } from 'react-hook-form'
import FieldTitle from '../FieldTitle'

type Props<T extends FieldValues> = {
	accessorKey: FieldPath<T>
	control?: Control<T>
	label?: string
	disableReset?: boolean
}

const normalizePostalCode = (value: string) => {
	if (!value[value.length - 1]?.match(/^\d+$/)) return ''

	const str = value.replace('-', '')

	const sliced = [str.slice(0, 2), str.slice(2, 5)]
	if (sliced[0].length !== 2) return value

	return (sliced[0] + '-' + sliced[1]).substring(0, 6)
}

const PostalCode = <T extends FieldValues>({ accessorKey, control, disableReset, label }: Props<T>) => {
	return (
		<FormField
			control={control}
			name={accessorKey}
			render={({ field }) => (
				<FormItem>
					{label && <FieldTitle disableReset={disableReset} accessorKey={accessorKey} label={label} />}
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
