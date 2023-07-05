import { components, DropdownIndicatorProps } from 'react-select'
import { ChevronDown } from 'lucide-react'

type SelectOptionType = {
	value: number
	label: string
}

export const DropdownIndicator = (props: DropdownIndicatorProps<SelectOptionType>) => {
	return (
		<components.DropdownIndicator {...props}>
			<ChevronDown className='h-4 w-4' />
		</components.DropdownIndicator>
	)
}
