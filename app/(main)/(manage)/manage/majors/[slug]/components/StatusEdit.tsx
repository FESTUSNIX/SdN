'use client'

import { useGlobalModalContext } from '@/app/(admin)/admin/context/GlobalModalContext'
import { publishMajor, unpublishMajor } from '@/app/_actions'
import { Button } from '@/app/components/ui/Button'
import { cn } from '@/lib/utils/utils'
import { Major } from '@prisma/client'
import { useMutation } from '@tanstack/react-query'
import { ArrowUpToLine, Undo } from 'lucide-react'
import toast from 'react-hot-toast'

type Props = Pick<Major, 'id' | 'name' | 'status'>

export const StatusEdit = ({ id, name, status }: Props) => {
	const { openModal } = useGlobalModalContext()

	const { mutateAsync: toggleStatus, isLoading } = useMutation({
		mutationFn: async () => {
			const path = `/manage/majors/${id}`

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
			onClick={async () => {
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
			variant={status === 'PUBLISHED' ? 'outline' : 'default'}
			className={cn(status === 'PUBLISHED' && 'text-destructive hover:border-destructive hover:text-destructive')}>
			{status === 'PUBLISHED' ? <Undo className='mr-2 h-4 w-4' /> : <ArrowUpToLine className='mr-2 h-4 w-4' />}
			<span>{status === 'PUBLISHED' ? 'Cofnij publikację' : 'Opublikuj'}</span>
		</Button>
	)
}
