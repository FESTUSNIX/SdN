'use client'

import { Button } from '@/app/components/ui/Button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/app/components/ui/Form'
import { Input } from '@/app/components/ui/Input'
import { RegisterPayload, RegisterValidator } from '@/lib/validators/register'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { signIn } from 'next-auth/react'
import { User } from '@prisma/client'

type Props = {}

const RegisterForm = () => {
	const form = useForm<RegisterPayload>({
		resolver: zodResolver(RegisterValidator),
		defaultValues: {
			name: '',
			email: '',
			password: ''
		}
	})

	const { mutate: register, isLoading } = useMutation({
		mutationFn: async (values: RegisterPayload) => {
			toast.loading('Creating an account...')

			const payload: RegisterPayload = {
				name: values.name,
				email: values.email,
				password: values.password
			}

			const { data } = await axios.post('/api/register', payload)

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

			return toast.error('Something went wrong.')
		},
		onSuccess: data => {
			toast.dismiss()
			toast.success('Created an account.')

			signIn('credentials', {
				email: data.email,
				password: form.getValues('password'),
				callbackUrl: '/'
			})

			form.reset()
		}
	})

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(e => register(e))} className='space-y-6'>
				<FormField
					control={form.control}
					name='name'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Name</FormLabel>
							<FormControl>
								<Input placeholder='John Doe' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='email'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input placeholder='ładny@pies.pl' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='password'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input type='password' placeholder='***********' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type='submit' disabled={isLoading}>
					{isLoading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
					Sign In
				</Button>
			</form>
		</Form>
	)
}

export default RegisterForm
