'use client'

import { Button } from '@/app/components/ui/Button'
import { Plus } from 'lucide-react'
import { useGlobalSheetContext } from '../../context/GlobalSheetContext'

type Props = {}

const NewAccountBtn = (props: Props) => {
	const { openSheet } = useGlobalSheetContext()

	return (
		<Button
			variant='default'
			size='sm'
			className='flex h-8'
			onClick={() => {
				openSheet('ADD_ACCOUNT')
			}}>
			<Plus className='mr-2 h-4 w-4' />
			New account
		</Button>
	)
}

export default NewAccountBtn
