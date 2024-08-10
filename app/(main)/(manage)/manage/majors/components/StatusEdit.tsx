'use client'

import { useGlobalModalContext } from '@/app/(admin)/admin/context/GlobalModalContext'
import { publishMajor, unpublishMajor } from '@/app/_actions'
import { Button, ButtonProps } from '@/app/components/ui/Button'
import { Major } from '@prisma/client'
import { useMutation } from '@tanstack/react-query'
import { forwardRef } from 'react'
import toast from 'react-hot-toast'

type Props = Omit<ButtonProps, 'id'> &
	Pick<Major, 'id' | 'name' | 'status'> & {
		children: React.ReactNode
		revalidationPath?: string
	}

export const StatusEdit = forwardRef<HTMLButtonElement, Props>(
	({ id, name, status, children, revalidationPath, className, onClick: _onClick, ...props }, ref) => {
		const { openModal } = useGlobalModalContext()

		const { mutateAsync: toggleStatus, isLoading } = useMutation({
			mutationFn: async () => {
				const path = revalidationPath ?? `/manage/majors/${id}`

				if (status === 'PUBLISHED') await unpublishMajor(id, path)
				if (status === 'DRAFT') await publishMajor(id, path)

				return status === 'PUBLISHED' ? 'DRAFT' : 'PUBLISHED'
			},
			onError: err => {
				toast.dismiss()

				return toast.error('Coś poszło nie tak')
			},
			onSuccess: async data => {
				toast.dismiss()

				toast.success(data === 'PUBLISHED' ? 'Opublikowano kierunek' : 'Cofnięto publikację kierunku')
			}
		})

		return (
			<Button
				ref={ref}
				onClick={async e => {
					e.preventDefault()
					e.stopPropagation()

					console.log('click')
					if (status === 'DRAFT') {
						return await toggleStatus()
					}

					openModal('CUSTOM', {
						title: `Czy napewno cofnąć publikację ${name}?`,
						description: 'Czy napewno chcesz cofnąć publikację tego kierunku?',
						onConfirm: async () => {
							await toggleStatus()
						},
						confirmButtonText: 'Cofnij publikację',
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
StatusEdit.displayName = 'StatusEdit'
