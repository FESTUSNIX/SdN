import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/app/components/ui/Form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/Select'
import { Control } from 'react-hook-form'
import { QualificationType } from '@prisma/client'

type Props = {
	formControl: Control<any>
}

const typeOptions = [
	...Object.values(QualificationType).map(type => {
		const lowerCaseType = type.toLowerCase()
		const label = lowerCaseType.charAt(0).toUpperCase() + lowerCaseType.slice(1)

		return { label: label, value: type }
	})
]

const Type = ({ formControl }: Props) => {
	return (
		<FormField
			control={formControl}
			name='type'
			render={({ field }) => (
				<FormItem>
					<FormLabel>Type</FormLabel>
					<Select onValueChange={field.onChange as (value: string) => void} defaultValue={field.value}>
						<FormControl>
							<SelectTrigger>
								<SelectValue placeholder='Select qualification type' />
							</SelectTrigger>
						</FormControl>
						<SelectContent>
							{typeOptions.map(option => (
								<SelectItem key={option.value} value={option.value}>
									{option.label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}

export default Type
