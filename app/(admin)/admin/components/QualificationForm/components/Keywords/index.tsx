import { Badge } from '@/app/components/ui/Badge'
import { Button } from '@/app/components/ui/Button'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/app/components/ui/Form'
import { Input } from '@/app/components/ui/Input'
import { QualificationFormType } from '@/lib/validators/qualification'
import { X } from 'lucide-react'

type Props = {
	form: QualificationFormType
}

const Keywords = ({ form }: Props) => {
	return (
		<div>
			<FormField
				control={form.control}
				name={'keywordInput'}
				render={({ field }) => (
					<FormItem className='mb-2'>
						<FormLabel>Keywords</FormLabel>
						<FormControl>
							<div className='flex w-full items-center space-x-2'>
								<Input
									{...field}
									placeholder={'Add new keyword'}
									value={field.value}
									onKeyDown={(e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
										e.key === 'Enter' && e.preventDefault()

										if (e.key === 'Enter' && field.value) {
											const keywords = form.getValues('keywords')

											form.setValue('keywords', [...keywords, field.value])
											field.onChange('')
										}
									}}
								/>
								<Button
									onClick={e => {
										e.preventDefault()

										const keywords = form.getValues('keywords')

										form.setValue('keywords', [...keywords, field.value])
										field.onChange('')
									}}>
									Add
								</Button>
							</div>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>

			<FormField
				control={form.control}
				name={'keywords'}
				render={({ field }) => (
					<FormItem>
						<FormControl>
							<ul className='flex flex-wrap gap-1'>
								{field.value.map((keyword, index) => (
									<li
										key={index}
										className='cursor-pointer'
										onClick={() => {
											field.onChange(field.value.filter((_, i) => i !== index))
										}}>
										<Badge variant={'secondary'}>
											{keyword}

											<X className='ml-2 h-3 w-3' />
										</Badge>
									</li>
								))}
							</ul>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
		</div>
	)
}

export default Keywords
