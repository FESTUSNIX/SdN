'use client'

import { Button } from '@/app/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/app/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/app/components/ui/form'
import { Input } from '@/app/components/ui/input'
import { PasswordChangeRequest } from '@/lib/validators/password'
import { zodResolver } from '@hookform/resolvers/zod'
import { DialogClose } from '@radix-ui/react-dialog'
import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'

const formSchema = z
	.object({
		currentPassword: z.string(),
		newPassword: z.string().min(6, {
			message: 'Hasło musi mieć conajmniej 6 znaków'
		}),
		confirmNewPassword: z.string().min(6, {
			message: 'Hasło musi mieć conajmniej 6 znaków'
		})
	})
	.refine(data => data.newPassword === data.confirmNewPassword, {
		message: 'Hasła sie nie zgadzają',
		path: ['confirmNewPassword']
	})

type Props = {
	className?: string
}

const ChangePassword = ({ className }: Props) => {
	const [isOpen, setIsOpen] = useState(false)

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			currentPassword: '',
			newPassword: '',
			confirmNewPassword: ''
		}
	})

	const { mutate: updatePassword, isLoading } = useMutation({
		mutationFn: async ({ currentPassword, newPassword }: z.infer<typeof formSchema>) => {
			const payload: PasswordChangeRequest = {
				currentPassword,
				newPassword
			}

			const { data } = await axios.patch(`/api/password/reset`, payload)
			return data
		},
		onError: err => {
			if (err instanceof AxiosError) {
				if (err.response?.status === 401) {
					return form.setError('currentPassword', { message: 'Nie poprawne hasło' })
				}
			}

			toast('Coś poszło nie tak')
		},
		onSuccess: () => {
			toast.dismiss()
			toast.success('Hasło pomyślnie zostało zmienione')

			form.reset()
			setIsOpen(false)
		}
	})
	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button variant={'link'} className={className}>
					Zmień hasło
				</Button>
			</DialogTrigger>
			<DialogContent className='sm:max-w-[425px]'>
				<DialogHeader>
					<DialogTitle>Ustaw nowe hasło</DialogTitle>
				</DialogHeader>

				<Form {...form}>
					<form id='new-password-form' onSubmit={form.handleSubmit(e => updatePassword(e))} className='space-y-4 py-4'>
						<FormField
							control={form.control}
							name='currentPassword'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Obecne hasło</FormLabel>
									<FormControl>
										<Input type='password' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='newPassword'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Nowe hasło</FormLabel>
									<FormControl>
										<Input type='password' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='confirmNewPassword'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Potwierdź nowe hasło</FormLabel>
									<FormControl>
										<Input type='password' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</form>
				</Form>
				<DialogFooter>
					<DialogClose asChild disabled={isLoading}>
						<Button variant={'ghost'}>Anuluj</Button>
					</DialogClose>
					<Button type='submit' form='new-password-form' disabled={isLoading}>
						{isLoading ? 'Zmienianie hasła' : 'Zmień hasło'}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

export default ChangePassword
