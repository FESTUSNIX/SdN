'use client'

import { useGlobalModalContext } from '@/app/(admin)/admin/context/GlobalModalContext'
import { removeAllArchivedMajorsFromUnit, revalidatePaths } from '@/app/_actions'
import { Button } from '@/app/components/ui/button'
import { Slot } from '@radix-ui/react-slot'
import { useMutation } from '@tanstack/react-query'
import { forwardRef } from 'react'
import toast from 'react-hot-toast'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
	unitId: number
	children: React.ReactNode
	asChild?: boolean
	revalidationPath?: string
}

export const EmptyTrash = forwardRef<HTMLButtonElement, Props>(
	({ unitId, children, asChild, revalidationPath, className, ...props }, ref) => {
		const { openModal } = useGlobalModalContext()

		const { mutateAsync: emptyTrash, isLoading } = useMutation({
			mutationFn: async () => {
				await removeAllArchivedMajorsFromUnit(unitId)
			},
			onError: err => {
				toast.dismiss()

				return toast.error('Coś poszło nie tak')
			},
			onSuccess: async () => {
				toast.dismiss()

				revalidatePaths([revalidationPath ?? `/manage/trash`])
				toast.success('Pomyślnie opróżniono kosz')
			}
		})

		const Comp = asChild ? Slot : Button

		return (
			<Comp
				ref={ref}
				onClick={async e => {
					e.stopPropagation()
					e.preventDefault()

					openModal('CUSTOM', {
						title: `Opróżnić kosz?`,
						description: 'Wszystkie kierunki w koszu zostaną usunięte na zawsze i nie będzie można ich przywrócić.',
						onConfirm: async () => {
							await emptyTrash()
						},
						confirmButtonText: 'Opróżnij kosz',
						confirmButtonVariant: 'destructive'
					})
				}}
				disabled={isLoading}
				{...props}>
				{children}
			</Comp>
		)
	}
)
EmptyTrash.displayName = 'EmptyTrash'
