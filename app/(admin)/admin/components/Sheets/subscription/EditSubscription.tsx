'use client'

import { useGlobalSheetContext } from '@/app/(admin)/admin/context/GlobalSheetContext'
import { Button } from '@/app/components/ui/Button'
import { ScrollArea } from '@/app/components/ui/ScrollArea'
import { SheetFooter, SheetHeader, SheetTitle } from '@/app/components/ui/Sheet'
import { SubscriptionPayload, SubscriptionValidator } from '@/lib/validators/subscription'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { Loader2 } from 'lucide-react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useFormChanges } from '../../../hooks/useFormChanges'
import { SubscriptionForm } from '../../Forms/SubscriptionForm'

const EditSubscription = () => {
	const { closeSheet, sheetState } = useGlobalSheetContext()
	const { defaultValues } = sheetState

	const form = useForm<SubscriptionPayload>({
		resolver: zodResolver(SubscriptionValidator),
		defaultValues: defaultValues
	})

	useFormChanges(form.formState)

	const { mutate: createSubscription, isLoading } = useMutation({
		mutationFn: async (values: SubscriptionPayload) => {
			toast.loading('Editing the subscription...')

			const payload: SubscriptionPayload = {
				slug: values.slug,
				from: values.from,
				to: values.to,
				unitId: values.unitId,
				type: values.type
			}

			console.log(payload)
			const { data } = await axios.patch('/api/subscriptions', payload)
			return data
		},
		onError: err => {
			toast.dismiss()

			if (err instanceof AxiosError) {
				if (err.response?.status === 404) {
					return toast.error('Could not find subscription to edit')
				}

				if (err.response?.status === 422) {
					return toast.error('Invalid subscription data')
				}
			}

			return toast.error('Something went wrong.')
		},
		onSuccess: async data => {
			await fetch('/api/revalidate?path=/admin/subscriptions')

			toast.dismiss()

			toast.success('Successfully edited')
			form.reset()

			closeSheet(false, true)
		}
	})

	useEffect(() => {
		form.reset(defaultValues)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [defaultValues])

	return (
		<>
			<SheetHeader className='border-b px-6 py-4'>
				<SheetTitle>Edit Subscription</SheetTitle>
			</SheetHeader>

			<ScrollArea className='h-full'>
				<SubscriptionForm form={form} onSubmit={e => createSubscription(e)} />
			</ScrollArea>

			<SheetFooter className='flex-row justify-end gap-4 border-t px-6 py-4'>
				<Button variant={'secondary'} onClick={() => closeSheet()}>
					Cancel
				</Button>

				{isLoading ? (
					<Button disabled>
						<Loader2 className='mr-2 h-4 w-4 animate-spin' />
						Editing subscription
					</Button>
				) : (
					<Button type='submit' onClick={form.handleSubmit(e => createSubscription(e))}>
						Edit subscription
					</Button>
				)}
			</SheetFooter>
		</>
	)
}

export default EditSubscription
