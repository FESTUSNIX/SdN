import { X } from 'lucide-react'
import { components, ClearIndicatorProps } from 'react-select'

type SelectOptionType = {
	value: number
	label: string
}

export const ClearIndicator = (props: ClearIndicatorProps<SelectOptionType>) => {
	return (
		<components.ClearIndicator {...props}>
			<X className='h-4 w-4' />
		</components.ClearIndicator>
	)
}
