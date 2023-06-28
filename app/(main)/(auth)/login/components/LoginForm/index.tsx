'use client'

import { Button } from '@/app/components/ui/Button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/app/components/ui/Form'
import { Input } from '@/app/components/ui/Input'
import { LoginPayload, LoginValidator } from '@/lib/validators/login'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'

type Props = {}

const LoginForm = () => {
	const [isLoading, setIsLoading] = useState(false)

	const form = useForm<LoginPayload>({
		resolver: zodResolver(LoginValidator),
		defaultValues: {
			email: '',
			password: ''
		}
	})

	const onSubmit = async (data: LoginPayload) => {
		setIsLoading(true)
		try {
			const { email, password } = data

			await signIn('credentials', {
				email: email,
				password: password,
				callbackUrl: '/admin'
			})
		} catch (error) {
			toast('There was an error while logging in. Please try again.')
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
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

				<Button type='submit' isLoading={isLoading}>
					Log In
				</Button>
			</form>
		</Form>
	)
}

export default LoginForm
