import { Badge } from '@/app/components/ui/Badge'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/app/components/ui/Form'
import { Input } from '@/app/components/ui/Input'
import { UnitEmailPayload } from '@/lib/validators/unitEmail'
import { KeyboardEvent, useState } from 'react'
import { Control, ControllerRenderProps } from 'react-hook-form'

type Props = {
	formControl: Control<UnitEmailPayload>
}

const SentTo = ({ formControl }: Props) => {
	const [inputValue, setInputValue] = useState('')

	const handleKeyDown = (
		event: KeyboardEvent<HTMLInputElement>,
		field: ControllerRenderProps<UnitEmailPayload, 'sentTo'>
	) => {
		if (event.key === 'Enter') {
			field.onChange([...field.value, inputValue])
			setInputValue('')
		}
	}

	return (
		<FormField
			control={formControl}
			name={'sentTo'}
			render={({ field }) => (
				<FormItem>
					<FormLabel>Sent To</FormLabel>
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
					<FormDescription>Ps. click enter after typing email</FormDescription>
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}

export default SentTo
