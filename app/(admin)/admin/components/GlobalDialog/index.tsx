'use client'

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle
} from '@/app/components/ui/Dialog'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { useGlobalModalContext } from '../../context/GlobalModalContext'
import { Button } from '@/app/components/ui/Button'

const GlobalDialog = () => {
	const { modalState, closeModal } = useGlobalModalContext()
	const { show, component, modalContent } = modalState

	const pathname = usePathname()
	const searchParams = useSearchParams()

	useEffect(() => {
		closeModal()
	}, [pathname, searchParams])

	return (
		<Dialog
			open={show}
			onOpenChange={open => {
				if (!open) closeModal()
			}}>
			<DialogContent className='sm:max-w-[425px]'>
				{component && component}

				{modalContent && (
					<>
						<DialogHeader>
							<DialogTitle>{modalContent.title}</DialogTitle>
							<DialogDescription>{modalContent.description}</DialogDescription>
						</DialogHeader>

						{modalContent.content}

						<DialogFooter>
							<Button
								variant={modalContent.cancelButtonVariant}
								onClick={() => {
									modalContent.onCancel && modalContent.onCancel()
									closeModal()
								}}>
								{modalContent.cancelButtonText}
							</Button>
							<Button
								variant={modalContent.confirmButtonVariant}
								onClick={() => {
									modalContent.onConfirm()
									closeModal()
								}}>
								{modalContent.confirmButtonText}
							</Button>
						</DialogFooter>
					</>
				)}
			</DialogContent>
		</Dialog>
	)
}

export default GlobalDialog
