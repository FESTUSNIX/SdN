import React from 'react'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/app/components/elements/Form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/elements/Select'
import { Input } from '@/app/components/elements/Input'
import { form } from '@/app/admin/components/modules/UnitForm/FormDefinition'

type Props = {
	form: form
}

const UnitType = ({ form }: Props) => {
	return (
		<>
			<FormField
				control={form.control}
				name='unitType'
				render={({ field }) => (
					<FormItem>
						<FormLabel>Unit Type</FormLabel>
						<Select onValueChange={field.onChange as (value: string) => void} defaultValue={field.value}>
							<FormControl>
								<SelectTrigger>
									<SelectValue placeholder='Select type of unit' />
								</SelectTrigger>
							</FormControl>
							<SelectContent>
								<SelectItem value='uczelnia'>Uczelnia</SelectItem>
								<SelectItem value='placówka doskonalenia nauczycieli'>Placówka doskonalenia nauczycieli</SelectItem>
								<SelectItem value='inna'>Inna</SelectItem>
							</SelectContent>
						</Select>
						<FormMessage />
					</FormItem>
				)}
			/>
			{form.getValues().unitType === 'inna' && (
				<FormField
					control={form.control}
					name='otherUnitType'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Other unit type</FormLabel>
							<FormControl>
								<Input placeholder='Aa...' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			)}
		</>
	)
}

export default UnitType
