import { useGlobalModalContext } from '@/app/(admin)/admin/context/GlobalModalContext'
import { Button } from '@/app/components/ui/Button'
import { UnitEmailPayload } from '@/lib/validators/unitEmail'
import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { Loader2 } from 'lucide-react'
import { Session } from 'next-auth'
import { useRouter } from 'next/navigation'
import React from 'react'
import { UseFormReturn } from 'react-hook-form'
import { toast } from 'react-hot-toast'

type Props = {
	form: UseFormReturn<UnitEmailPayload, any, undefined>
	unitId: number
	session: Session
}

const AddEmailSubmit = ({ form, unitId, session }: Props) => {
	const { closeModal } = useGlobalModalContext()

	const router = useRouter()

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

			console.log(payload)
			// const { data } = await axios.post(`/api/emails`, payload)

			// return data
			return 'yes'
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

	return isLoading ? (
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
	)
}

export default AddEmailSubmit
