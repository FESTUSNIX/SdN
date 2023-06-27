'use client'

import { Button } from '@/app/components/ui/Button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/app/components/ui/Form'
import { Input } from '@/app/components/ui/Input'
import { LoginPayload, LoginValidator } from '@/lib/validators/login'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

type Props = {}

const LoginForm = () => {
	const form = useForm<LoginPayload>({
		resolver: zodResolver(LoginValidator),
		defaultValues: {
			email: '',
			password: ''
		}
	})

	function onSubmit(data: LoginPayload) {
		console.log(data)

		// toast({
		// 	title: 'You submitted the following values:',
		// })
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

				<Button type='submit'>Sign In</Button>
			</form>
		</Form>
	)
}

export default LoginForm
