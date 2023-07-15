'use client'

import { RefreshCw } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Button } from '../../ui/Button'
import { cn } from '@/lib/utils/utils'

const RefreshTable = () => {
	const [isRefreshing, setIsRefreshing] = useState(false)

	const router = useRouter()

	return (
		<Button
			variant='outline'
			onClick={() => {
				setIsRefreshing(true)
				router.refresh()
				setTimeout(() => {
					setIsRefreshing(false)
				}, 500)
			}}
			disabled={isRefreshing}
			className='h-8 px-2 lg:px-3'>
			<RefreshCw className={cn('mr-2 h-4 w-4', isRefreshing && 'animate-spin')} />
			{isRefreshing ? 'Refreshing...' : 'Refresh'}
		</Button>
	)
}

export default RefreshTable
