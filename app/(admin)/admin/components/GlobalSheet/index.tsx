import { Sheet, SheetContent } from '@/app/components/ui/sheet'
import { useGlobalSheetContext } from '../../context/GlobalSheetContext'
import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

const GlobalSheet = () => {
	const { sheetState, closeSheet } = useGlobalSheetContext()
	const { show, content } = sheetState

	const pathname = usePathname()
	const searchParams = useSearchParams()

	useEffect(() => {
		closeSheet()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pathname, searchParams])

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
