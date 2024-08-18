import { useGlobalModalContext } from '@/app/(admin)/admin/context/GlobalModalContext'
import { Button } from '@/app/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/app/components/ui/popover'
import { H4, Muted } from '@/app/components/ui/Typography'
import { PopoverClose } from '@radix-ui/react-popover'
import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'

type Props = {
	emailId: number
}

const DeleteEmail = ({ emailId }: Props) => {
	const { closeModal } = useGlobalModalContext()
	const router = useRouter()

	const { mutate: deleteEmail, isLoading } = useMutation({
		mutationFn: async () => {
			toast.loading('Deleting email...')

			const { data } = await axios.delete(`/api/emails/${emailId}`)

			return data
		},
		onError: err => {
			toast.dismiss()

			if (err instanceof AxiosError) {
				if (err.response?.status === 422) {
					return toast.error('Invalid data')
				}
			}

			return toast.error('Something went wrong.')
		},
		onSuccess: data => {
			toast.dismiss()

			toast.success('Deleted email.')

			closeModal()

			router.refresh()
		}
	})

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant={'outline'} size={'sm'} className='rounded-full'>
					<Trash2 className='mr-2 h-4 w-4 text-muted-foreground' /> Delete
				</Button>
			</PopoverTrigger>
			<PopoverContent side='top'>
				<H4 size='sm'>Are you sure?</H4>
				<Muted>This action cannot be undone.</Muted>
				<div className='mt-4 flex justify-end gap-2'>
					<PopoverClose asChild>
						<Button variant='outline' size='sm'>
							Cancel
						</Button>
					</PopoverClose>
					{isLoading ? (
						<Button variant='destructive' size='sm' disabled>
							Deleting
						</Button>
					) : (
						<Button
							variant='destructive'
							size='sm'
							onClick={() => {
								deleteEmail()
							}}>
							Delete
						</Button>
					)}
				</div>
			</PopoverContent>
		</Popover>
	)
}

export default DeleteEmail
