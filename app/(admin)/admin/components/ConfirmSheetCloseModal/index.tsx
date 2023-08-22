'use client'

import { Button } from '@/app/components/ui/Button'
import { Dialog, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/app/components/ui/Dialog'
import { useGlobalModalContext } from '../../context/GlobalModalContext'
import { useGlobalSheetContext } from '../../context/GlobalSheetContext'

const ConfirmSheetCloseModal = () => {
	const {
		closeModal,
		modalState: { show }
	} = useGlobalModalContext()
	const { closeSheet } = useGlobalSheetContext()

	return (
		<Dialog
			open={show}
			onOpenChange={open => {
				if (!open) closeModal()
			}}>
			<DialogHeader>
				<DialogTitle>Confirm to close</DialogTitle>
				<DialogDescription>
					There are unsaved changes. Are you sure you want to close the panel? Your changes will be lost.
				</DialogDescription>
			</DialogHeader>

			<DialogFooter>
				<Button
					variant={'outline'}
					onClick={() => {
						closeModal()
					}}>
					Cancel
				</Button>
				<Button
					variant={'destructive'}
					onClick={() => {
						closeSheet(false, true)
						closeModal()
					}}>
					Confirm
				</Button>
			</DialogFooter>
		</Dialog>
	)
}

export default ConfirmSheetCloseModal
