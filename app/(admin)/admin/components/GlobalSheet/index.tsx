import React from 'react'
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle } from '@/app/components/ui/Sheet'
import { ScrollArea } from '@/app/components/ui/ScrollArea'
import { Button } from '@/app/components/ui/Button'
import { Loader2 } from 'lucide-react'
import { useGlobalSheetContext } from '../../context/GlobalSheetContext'

const GlobalSheet = () => {
	const { sheetState, closeSheet } = useGlobalSheetContext()
	const { show, content } = sheetState

	return (
		<Sheet
			modal
			open={show}
			onOpenChange={open => {
				if (!open) closeSheet()
			}}>
			<SheetContent side={'right'} className='flex w-screen max-w-xl flex-col gap-0 p-0 sm:min-w-[500px]'>
				{content}
			</SheetContent>
		</Sheet>
	)
}

export default GlobalSheet
