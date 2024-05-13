import { MultiSelect } from '@/app/components/MultiSelect'
import { FormField, FormItem, FormLabel, FormMessage } from '@/app/components/ui/Form'
import { MajorFormType } from '@/lib/validators/major'
import { Qualification } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

type Props = {
	form: MajorFormType
}

const Qualifications = ({ form }: Props) => {
	const { data: qualifications } = useQuery({
		queryKey: ['qualifications'],
		queryFn: async () => {
			const { data } = await axios.get<Qualification[]>('/api/qualifications')

			return data
		},
		cacheTime: 0
	})

	const qualificationsOptions = qualifications?.map(qualification => ({
		label: qualification.name,
		value: qualification.id.toString()
	}))

	if (!qualificationsOptions) return null

	return (
		<FormField
			control={form.control}
			name='qualifications'
			render={({ field }) => (
				<FormItem>
					<FormLabel>Qualifications</FormLabel>
					<MultiSelect
						options={qualificationsOptions}
						selected={field.value.map(q => q.toString())}
						setSelected={values => field.onChange(values?.map(v => parseInt(v)))}
						placeholder='Select qualifications...'
					/>
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}

export default Qualifications
