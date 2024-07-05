'use client'

import { useGlobalModalContext } from '@/app/(admin)/admin/context/GlobalModalContext'
import { removeMajor, revalidatePaths } from '@/app/_actions'
import { Button, ButtonProps } from '@/app/components/ui/Button'
import { useMutation } from '@tanstack/react-query'
import React, { forwardRef } from 'react'
import toast from 'react-hot-toast'

type Props = ButtonProps & {
	majorId: number
	name: string
	children: React.ReactNode
	revalidationPath?: string
}

export const RemoveArchivedMajor = forwardRef<HTMLButtonElement, Props>(
	({ majorId, name, children, revalidationPath, className, ...props }, ref) => {
		const { openModal } = useGlobalModalContext()

		const { mutateAsync: handleRemove, isLoading } = useMutation({
			mutationFn: async () => {
				await removeMajor(majorId)
			},
			onError: err => {
				toast.dismiss()

				return toast.error('Coś poszło nie tak')
			},
			onSuccess: async () => {
				toast.dismiss()

				revalidatePaths([`/manage/trash`])
				toast.success('Pomyślnie usunięto kierunek')
			}
		})

		return (
			<Button
				ref={ref}
				onClick={async e => {
					e.stopPropagation()
					e.preventDefault()

					openModal('CUSTOM', {
						title: `Usunąć na zawsze?`,
						description: `Kierunek "${name}" zostanie usunięty na zawsze i nie będzie można go przywrócić.`,
						onConfirm: async () => {
							await handleRemove()
						},
						confirmButtonText: 'Usuń na zawsze',
						confirmButtonVariant: 'destructive'
					})
				}}
				disabled={isLoading}
				{...props}>
				{children}
			</Button>
		)
	}
)
RemoveArchivedMajor.displayName = 'RemoveArchivedMajor'
