import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/app/components/ui/Form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/Select'
import { MajorFormType } from '@/lib/validators/major'

type Props = {
	form: MajorFormType
}

const majorLevelOptions = [
	{ value: 'PODYPLOMOWE', label: 'Podyplomowe' },
	{ value: 'PIERWSZEGO_STOPNIA', label: 'Pierwszego Stopnia' },
	{ value: 'DRUGIEGO_STOPNIA', label: 'Drugiego Stopnia' },
	{ value: 'JEDNOLITE_MAGISTERSKIE', label: 'Jednolite Magisterskie' }
]

const MajorLevel = ({ form }: Props) => {
	return (
		<FormField
			control={form.control}
			name='majorLevel'
			render={({ field }) => (
				<FormItem>
					<FormLabel>Major Level</FormLabel>
					<Select onValueChange={field.onChange as (value: string) => void} defaultValue={field.value}>
						<FormControl>
							<SelectTrigger>
								<SelectValue placeholder='Select major level' />
							</SelectTrigger>
						</FormControl>
						<SelectContent>
							{majorLevelOptions.map(option => (
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

export default MajorLevel
