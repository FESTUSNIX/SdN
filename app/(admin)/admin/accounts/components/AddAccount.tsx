'use client'

import { Button } from '@/app/components/ui/Button'
import { ScrollArea } from '@/app/components/ui/ScrollArea'
import { SheetFooter, SheetHeader, SheetTitle } from '@/app/components/ui/Sheet'
import { RegisterPayload, RegisterValidator } from '@/lib/validators/register'
import { zodResolver } from '@hookform/resolvers/zod'
import { User } from '@prisma/client'
import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { useGlobalSheetContext } from '../../context/GlobalSheetContext'
import AccountForm from './AccountForm'

const AddAccount = () => {
	const { closeSheet } = useGlobalSheetContext()

	const form = useForm<RegisterPayload>({
		resolver: zodResolver(RegisterValidator),
		defaultValues: {
			name: '',
			email: '',
			password: '',
			role: 'UNIT',
			unitId: ''
		}
	})

	const { mutate: createAccount, isLoading } = useMutation({
		mutationFn: async (values: RegisterPayload) => {
			toast.loading('Creating an account...')

			const payload: RegisterPayload = {
				name: values.name,
				email: values.email,
				password: values.password,
				role: values.role,
				unitId: values.unitId
			}

			const { data } = await axios.post('/api/account', payload)

			return data as User
		},
		onError: err => {
			toast.dismiss()

			if (err instanceof AxiosError) {
				if (err.response?.status === 409) {
					return toast.error('This email is already taken.')
				}

				if (err.response?.status === 422) {
					return toast.error('Invalid user data')
				}
			}

			closeSheet()
			return toast.error('Something went wrong.')
		},
		onSuccess: data => {
			toast.dismiss()
			toast.success('Created an account.')

			form.reset()
			closeSheet()
		}
	})

	return (
		<>
			<SheetHeader className='border-b px-6 py-4'>
				<SheetTitle>Add Account</SheetTitle>
			</SheetHeader>

			<ScrollArea className='h-full'>
				<AccountForm form={form} onSubmit={e => createAccount(e)} />
			</ScrollArea>

			<SheetFooter className='flex-row justify-end gap-4 border-t px-6 py-4'>
				<Button variant={'secondary'} onClick={() => closeSheet()}>
					Cancel
				</Button>

				{isLoading ? (
					<Button type='submit' disabled>
						<Loader2 className='mr-2 h-4 w-4 animate-spin' />
						Creating account
					</Button>
				) : (
					<Button type='submit' onClick={form.handleSubmit(e => createAccount(e))}>
						Create account
					</Button>
				)}
			</SheetFooter>
		</>
	)
}

export default AddAccount
