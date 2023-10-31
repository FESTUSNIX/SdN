import { FormControl, FormField, FormItem, FormLabel } from '@/app/components/ui/Form'
import { PublicUnitFormType } from '@/lib/validators/public-unit'
import { RadioGroup, RadioGroupItem } from '../../ui/radio-group'
import FieldTitle from '../FieldTitle'

type Props = {
	form: PublicUnitFormType
}

const IsPublic = ({ form }: Props) => {
	return (
		<FormField
			control={form.control}
			name='isPublic'
			render={({ field }) => (
				<FormItem>
					<FieldTitle accessorKey='isPublic' label='Status jednostki' />
					<FormControl className='py-2'>
						<RadioGroup
							onValueChange={value => field.onChange(value === 'publiczna')}
							defaultValue={field.value ? 'publiczna' : 'prywatna'}
							value={field.value ? 'publiczna' : 'prywatna'}
							className='flex flex-col'>
							<FormItem className='flex items-center space-x-3 space-y-0'>
								<FormControl>
									<RadioGroupItem value='publiczna' />
								</FormControl>
								<FormLabel className='font-normal'>Publiczna</FormLabel>
							</FormItem>
							<FormItem className='flex items-center space-x-3 space-y-0'>
								<FormControl>
									<RadioGroupItem value='prywatna' />
								</FormControl>
								<FormLabel className='font-normal'>Prywatna</FormLabel>
							</FormItem>
						</RadioGroup>
					</FormControl>
				</FormItem>
			)}
		/>
	)
}

export default IsPublic
