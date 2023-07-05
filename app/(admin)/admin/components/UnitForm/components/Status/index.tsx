import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/app/components/ui/Form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/Select'
import { UnitFormType } from '@/lib/validators/unit'

type Props = {
	form: UnitFormType
}

const Status = ({ form }: Props) => {
	return (
		<>
			<FormField
				control={form.control}
				name='status'
				render={({ field }) => (
					<FormItem>
						<FormLabel>Status</FormLabel>
						<Select onValueChange={field.onChange as (value: string) => void} defaultValue={field.value}>
							<FormControl>
								<SelectTrigger>
									<SelectValue placeholder='Select work status' />
								</SelectTrigger>
							</FormControl>
							<SelectContent>
								<SelectItem value='FINISHED'>Finished</SelectItem>
								<SelectItem value='IN_PROGRESS'>In Progress</SelectItem>
								<SelectItem value='TO_CHECK'>To Check</SelectItem>
							</SelectContent>
						</Select>
						<FormMessage />
					</FormItem>
				)}
			/>
		</>
	)
}

export default Status
