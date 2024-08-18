'use client'

import { useGlobalModalContext } from '@/app/(admin)/admin/context/GlobalModalContext'
import { removeAllMajorsFromUnit } from '@/app/_actions'
import { Button } from '@/app/components/ui/button'
import { Unit } from '@prisma/client'
import { useMutation } from '@tanstack/react-query'
import { Trash2 } from 'lucide-react'
import toast from 'react-hot-toast'

type Props = Pick<Unit, 'id' | 'name' | 'slug'>

export const RemoveAllMajorsButton = ({ id, name, slug }: Props) => {
	const { openModal } = useGlobalModalContext()

	const { mutateAsync: removeAllMajors, isLoading } = useMutation({
		mutationFn: async () => {
			toast.loading('Removing all majors. Do not close the page.')

			await removeAllMajorsFromUnit(id, slug)

			return 'OK'
		},
		onError: err => {
			toast.dismiss()
			return toast.error('Something went wrong')
		},
		onSuccess: async data => {
			toast.dismiss()
			toast.success('Majors removed')
		}
	})

	return (
		<Button
			onClick={() => {
				openModal('CUSTOM', {
					title: `Remove all majors from ${name}`,
					description: 'Are you sure you want to remove all majors? This action cannot be undone.',
					onConfirm: async () => {
						await removeAllMajors()
					},
					confirmButtonText: 'Remove ALL majors',
					confirmButtonVariant: 'destructive'
				})
			}}
			variant={'outline'}
			className='w-max text-destructive hover:border-destructive hover:text-destructive'>
			<Trash2 className='mr-2 h-4 w-4' />
			<span>{isLoading ? 'Removing all majors' : 'Remove all majors'}</span>
		</Button>
	)
}
