'use client'

import { RefreshCw } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { Button } from '../../ui/button'
import { cn } from '@/lib/utils'
import { revalidatePaths } from '@/app/_actions'

const RefreshTable = () => {
	const [isRefreshing, setIsRefreshing] = useState(false)
	const router = useRouter()
	const pathname = usePathname()

	return (
		<Button
			variant='outline'
			onClick={() => {
				setIsRefreshing(true)

				router.refresh()
				revalidatePaths([pathname])

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
