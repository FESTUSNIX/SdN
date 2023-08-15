import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/app/components/ui/Form'
import { Input } from '@/app/components/ui/Input'
import { Control } from 'react-hook-form'
import { Textarea } from '../../ui/Textarea/textarea'

type Props = {
	formControl: Control<any>
	accessorKey: string
	label?: string
	placeholder?: string
	description?: string
	type?: string
	nullable?: boolean
	textarea?: boolean
}

export const TextField = ({
	formControl,
	label,
	accessorKey,
	placeholder,
	description,
	type = 'text',
	nullable = false,
	textarea
}: Props) => {
	return (
		<FormField
			control={formControl}
			name={accessorKey}
			render={({ field }) => (
				<FormItem>
					{label && <FormLabel>{label}</FormLabel>}
					<FormControl>
						{textarea ? (
							<Textarea {...field} placeholder={placeholder} value={nullable ? field.value ?? '' : field.value} />
						) : (
							<Input
								{...field}
								type={type}
								placeholder={placeholder}
								value={nullable ? field.value ?? '' : field.value}
							/>
						)}
					</FormControl>
					{description && <FormDescription>{description}</FormDescription>}
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}
