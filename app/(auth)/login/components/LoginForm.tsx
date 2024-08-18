'use client'

import { TextField } from '@/app/components/Forms/TextField'
import { Button } from '@/app/components/ui/button'
import { Form } from '@/app/components/ui/form'
import { LoginPayload, LoginValidator } from '@/lib/validators/login'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { signIn } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'

export const LoginForm = () => {
	const searchParams = useSearchParams()
	const callbackUrl = searchParams.get('callbackUrl')

	const form = useForm<LoginPayload>({
		resolver: zodResolver(LoginValidator),
		defaultValues: {
			email: '',
			password: ''
		}
	})

	const { mutate: login, isLoading } = useMutation({
		mutationFn: async (values: LoginPayload) => {
			const { email, password } = values

			await signIn('credentials', {
				email: email,
				password: password,
				callbackUrl: callbackUrl || '/manage'
			})

			return 'OK'
		},
		onError: err => {
			return toast.error('Coś poszło nie tak.')
		},
		onSuccess: data => {
			form.reset()
		}
	})

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(e => login(e))} className='space-y-6'>
				<TextField
					control={form.control}
					accessorKey='email'
					label='Email'
					placeholder='jan@kowalski.pl'
					inputProps={{ className: 'py-6' }}
				/>
				<TextField
					control={form.control}
					accessorKey='password'
					type='password'
					label='Hasło'
					placeholder='***********'
					inputProps={{ className: 'py-6' }}
				/>

				<Button type='submit' isLoading={isLoading} className='mt-6 h-12 w-full rounded-full'>
					{isLoading ? 'Logowanie...' : 'Zaloguj się'}
				</Button>
			</form>
		</Form>
	)
}
