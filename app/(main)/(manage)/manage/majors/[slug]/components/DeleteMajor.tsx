'use client'

import { useGlobalModalContext } from '@/app/(admin)/admin/context/GlobalModalContext'
import { archiveMajor, revalidatePaths } from '@/app/_actions'
import { Button } from '@/app/components/ui/button'
import { Major } from '@prisma/client'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

type Props = Pick<Major, 'id' | 'name'>

export const DeleteMajor = ({ id, name }: Props) => {
	const { openModal } = useGlobalModalContext()

	const router = useRouter()

	const { mutateAsync: deleteMajor, isLoading } = useMutation({
		mutationFn: async () => {
			toast.loading('Trwa usuwanie kierunku')

			await archiveMajor(id, `/manage/majors`)
		},
		onError: err => {
			toast.dismiss()

			if (err instanceof AxiosError) {
				if (err.response?.status === 404) {
					return toast.error('Nie odnaleziono kierunku do usunięcia')
				}

				if (err.response?.status === 403) {
					return toast.error('Nie posiadasz wystarczających uprawnień')
				}

				if (err.response?.status === 422) {
					return toast.error('Nie poprawne dane')
				}
			}

			return toast.error('Coś poszło nie tak')
		},
		onSuccess: async data => {
			toast.dismiss()

			revalidatePaths(['/manage/majors'])

			router.push('/manage/majors')
			toast.success('Pomyślnie usunięto kierunek')
		}
	})

	return (
		<Button
			onClick={() => {
				openModal('CUSTOM', {
					title: `Usuń kierunek ${name}`,
					description: 'Czy napewno usunąć ten kierunek? Zmiany są nieodwracalne.',
					onConfirm: async () => {
						await deleteMajor()
					},
					confirmButtonText: 'Usuń kierunek',
					confirmButtonVariant: 'destructive'
				})
			}}
			variant={'outline'}
			className='text-destructive hover:border-destructive hover:text-destructive'>
			<Trash2 className='mr-2 h-4 w-4' />
			<span>{isLoading ? 'Usuwanie kierunku' : 'Usuń kierunek'}</span>
		</Button>
	)
}
