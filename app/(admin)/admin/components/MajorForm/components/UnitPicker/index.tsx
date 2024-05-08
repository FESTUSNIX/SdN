import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/app/components/ui/Form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/Select'
import { MajorFormType } from '@/lib/validators/major'
import { Unit } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

type Props = {
	form: MajorFormType
}

const UnitPicker = ({ form }: Props) => {
	const { data: units } = useQuery({
		queryKey: ['units'],
		queryFn: async () => {
			const { data } = await axios.get<Pick<Unit, 'id' | 'slug' | 'name'>[]>('/api/units')

			return data
		},
		cacheTime: 0
	})

	const unitsOptions = units?.map(unit => ({
		label: unit.name,
		value: { id: unit.id, slug: unit.slug }
	}))

	if (!unitsOptions) return null

	return (
		<FormField
			control={form.control}
			name='unitId'
			render={({ field }) => (
				<FormItem>
					<FormLabel>Unit</FormLabel>
					<Select onValueChange={value => field.onChange(parseInt(value))} defaultValue={field.value.toString()}>
						<FormControl>
							<SelectTrigger>
								<SelectValue placeholder='Select major level' />
							</SelectTrigger>
						</FormControl>
						<SelectContent>
							{unitsOptions.map(unit => (
								<SelectItem key={unit.value.id} value={unit.value.id.toString()}>
									{unit.label}
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

export default UnitPicker
