import { X } from 'lucide-react'
import React from 'react'

type Props = {
	defaultValue: any
	currentValue: any
	resetFn: () => void
}

const ResetField = ({ defaultValue, currentValue, resetFn }: Props) => {
	return (
		<div>
			{currentValue !== defaultValue && (
				<button
					type='button'
					onClick={() => resetFn()}
					className='flex items-center gap-1 text-muted-foreground hover:underline'>
					<X className='h-3 w-3' />
					<span className='text-xs leading-3'>Reset</span>
				</button>
			)}
		</div>
	)
}

export default ResetField
