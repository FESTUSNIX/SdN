import { Badge } from '@/app/components/ui/badge'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/app/components/ui/form'
import { Input } from '@/app/components/ui/input'
import { UnitEmailPayload } from '@/lib/validators/unitEmail'
import { KeyboardEvent, useState } from 'react'
import { Control, ControllerRenderProps } from 'react-hook-form'

type Props = {
	control: Control<UnitEmailPayload>
}

const SendTo = ({ control }: Props) => {
	const [inputValue, setInputValue] = useState('')

	const handleKeyDown = (
		event: KeyboardEvent<HTMLInputElement>,
		field: ControllerRenderProps<UnitEmailPayload, 'sendTo'>
	) => {
		if (event.key === 'Enter') {
			field.onChange([...field.value, inputValue])
			setInputValue('')
		}
	}

	return (
		<FormField
			control={control}
			name={'sendTo'}
			render={({ field }) => (
				<FormItem>
					<FormLabel>Send To</FormLabel>
					<FormControl>
						<div>
							<Input
								placeholder={'Add email'}
								value={inputValue}
								onChange={e => setInputValue(e.target.value)}
								onKeyDown={e => handleKeyDown(e, field)}
							/>

							<div className='mt-4 flex flex-wrap items-center gap-2'>
								{field.value.map((email, i) => (
									<Badge key={i} variant={'secondary'}>
										{email}
									</Badge>
								))}
							</div>
						</div>
					</FormControl>
					<FormDescription>Click enter after typing email</FormDescription>
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}

export default SendTo
