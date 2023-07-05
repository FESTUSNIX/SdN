import { X } from 'lucide-react'
import { components, MultiValueRemoveProps } from 'react-select'

export const MultiValueRemove = (props: MultiValueRemoveProps) => {
	return (
		<components.MultiValueRemove {...props}>
			<X className='h-3 w-3' />
			<span className='border-border bg-foreground'></span>
		</components.MultiValueRemove>
	)
}
