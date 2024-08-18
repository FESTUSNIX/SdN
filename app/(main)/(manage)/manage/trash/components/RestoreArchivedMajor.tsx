'use client'

import { restoreMajor, revalidatePaths } from '@/app/_actions'
import { Button, ButtonProps } from '@/app/components/ui/button'
import { useMutation } from '@tanstack/react-query'
import React, { forwardRef } from 'react'
import toast from 'react-hot-toast'

type Props = ButtonProps & {
	majorId: number
	name: string
	children: React.ReactNode
	revalidationPath?: string
}

export const RestoreArchivedMajor = forwardRef<HTMLButtonElement, Props>(
	({ majorId, name, children, revalidationPath, className, ...props }, ref) => {
		const { mutateAsync: handleRestore, isLoading } = useMutation({
			mutationFn: async () => {
				await restoreMajor(majorId)
			},
			onError: err => {
				toast.dismiss()

				return toast.error('Coś poszło nie tak')
			},
			onSuccess: async () => {
				toast.dismiss()

				revalidatePaths(['/manage/trash', '/manage/majors'])
				toast.success('Pomyślnie przywrócono kierunek')
			}
		})

		return (
			<Button
				ref={ref}
				onClick={async e => {
					await handleRestore()
				}}
				disabled={isLoading}
				{...props}>
				{children}
			</Button>
		)
	}
)
RestoreArchivedMajor.displayName = 'RestoreArchivedMajor'
