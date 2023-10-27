import { MajorFormType } from '@/lib/validators/major'
import { Qualification } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Suspense, useEffect, useMemo, useState } from 'react'
import { Skeleton } from '../../ui/skeleton'
import { MultiSelectField } from '../MultiSelectField'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../ui/Form'
import { MultiSelect } from '../../MultiSelect'

type Props = {
	form: MajorFormType
}

export const QualificationsField = ({ form }: Props) => {
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

	const defaultQualifications = useMemo(
		() =>
			qualificationsOptions?.filter(qualification =>
				form.formState.defaultValues?.qualifications?.includes(parseInt(qualification.value))
			),
		[]
	)

	const [selectedQualifications, setSelectedQualifications] = useState<{ value: string; label: string }[] | null>(
		defaultQualifications ?? null
	)

	useEffect(() => {
		form.setValue('qualifications', selectedQualifications?.map(q => parseInt(q.value)) ?? [])
	}, [selectedQualifications])

	return (
		<FormField
			control={form.control}
			name={'qualifications'}
			render={({ field }) => (
				<FormItem>
					<FormLabel>Kwalifikacje</FormLabel>
					<FormControl>
						{qualificationsOptions?.length ? (
							<MultiSelect
								options={qualificationsOptions}
								selected={selectedQualifications}
								setSelected={setSelectedQualifications}
								placeholder={'Wybierz kwalifikacje'}
							/>
						) : (
							<Skeleton className='h-10 w-full' />
						)}
					</FormControl>

					<FormMessage />
				</FormItem>
			)}
		/>
	)
}
