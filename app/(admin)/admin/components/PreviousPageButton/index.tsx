'use client'

import { Button } from '@/app/components/ui/Button'
import { cn } from '@/lib/utils'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

type Props = {
	children?: React.ReactNode
	action?: () => void
	className?: string
}

const PreviousPageButton = ({ children, action, className }: Props) => {
	const router = useRouter()

	return (
		<Button
			variant={'link'}
			className={cn('mb-4', className)}
			onClick={() => {
				action && action()
				router.back()
			}}>
			{children ?? (
				<>
					<ArrowLeft className='mr-2 h-4 w-4' /> Go back
				</>
			)}
		</Button>
	)
}

export default PreviousPageButton
