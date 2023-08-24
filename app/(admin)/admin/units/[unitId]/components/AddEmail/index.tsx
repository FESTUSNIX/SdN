import { useGlobalModalContext } from '@/app/(admin)/admin/context/GlobalModalContext'
import { Button } from '@/app/components/ui/Button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/app/components/ui/Dialog'
import { ScrollArea } from '@/app/components/ui/ScrollArea'
import { UnitEmailPayload, UnitEmailValidator } from '@/lib/validators/unitEmail'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { Loader2 } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { z } from 'zod'
import EmailForm from '../EmailForm'

type Props = {
	unitId: number
}

const AddEmail = ({ unitId }: Props) => {
	const { data: session } = useSession()

	const { closeModal, modalState } = useGlobalModalContext()
	const { show } = modalState

	const router = useRouter()

	const form = useForm<UnitEmailPayload>({
		resolver: zodResolver(
			UnitEmailValidator.omit({ unitId: true }).extend({
				content: z.array(z.any()).refine(v => v.length > 0, {
					message: 'Email content cannot be empty.'
				})
			})
		),
		defaultValues: {
			title: '',
			content: [],
			sentBy: session?.user?.id,
			sentAt: new Date(),
			unitId: unitId,
			sentTo: []
		}
	})

	const { mutate: createEmail, isLoading } = useMutation({
		mutationFn: async (values: UnitEmailPayload) => {
			toast.loading('Adding a new email...')

			const payload: UnitEmailPayload = {
				title: values.title,
				content: values.content,
				sentBy: values.sentBy ?? session?.user?.id,
				sentTo: [],
				sentAt: new Date(),
				unitId: unitId
			}

			const { data } = await axios.post(`/api/emails`, payload)

			return data
		},
		onError: err => {
			toast.dismiss()

			if (err instanceof AxiosError) {
				if (err.response?.status === 422) {
					return toast.error('Invalid email data')
				}
			}

			return toast.error('Something went wrong.')
		},
		onSuccess: data => {
			toast.dismiss()

			toast.success('Added a new email.')
			form.reset()

			closeModal()
			router.refresh()
		}
	})

	return (
		<Dialog
			open={show}
			onOpenChange={open => {
				if (!open) closeModal()
			}}>
			<DialogContent className='h-full sm:max-h-[calc(100vh-8rem)] md:!max-w-[700px] lg:!max-w-[900px]'>
				<ScrollArea>
					<DialogHeader>
						<DialogTitle>Add a new email</DialogTitle>
					</DialogHeader>

					<div className='mt-6'>
						<EmailForm form={form} />
					</div>

					<DialogFooter className='mt-6 gap-y-2'>
						<Button variant={'outline'} onClick={() => closeModal()}>
							Cancel
						</Button>

						{isLoading ? (
							<Button disabled>
								<Loader2 className='mr-2 h-4 w-4 animate-spin' />
								Adding new email
							</Button>
						) : (
							<Button
								type='submit'
								onClick={() => {
									form.handleSubmit(e => createEmail(e))()
								}}>
								Add new email
							</Button>
						)}
					</DialogFooter>
				</ScrollArea>
			</DialogContent>
		</Dialog>
	)
}

export default AddEmail
