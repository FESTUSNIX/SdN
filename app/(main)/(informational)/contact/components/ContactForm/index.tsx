'use client'

import { Button } from '@/app/components/ui/Button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/app/components/ui/Form'
import { Input } from '@/app/components/ui/Input'
import { Textarea } from '@/app/components/ui/Textarea/textarea'
import { H4 } from '@/app/components/ui/Typography'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { z } from 'zod'

const formSchema = z.object({
	name: z.string().min(2, { message: 'Nazwa musi zawierać conajmniej 2 znaki' }),
	email: z.string().email({
		message: 'Prosimy o podanie poprawnego adresu email'
	}),
	message: z.string().nonempty({
		message: 'Prosimy o podanie wiadomości'
	})
})

const ContactForm = () => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
			email: '',
			message: ''
		}
	})

	function onSubmit(values: z.infer<typeof formSchema>) {
		console.log(values)
		toast.success(
			<div>
				<H4>Submitted</H4>
				<p>Name: {values.name}</p>
				<p>Email: {values.email}</p>
				<p>Message: {values.message}</p>
			</div>
		)

		form.reset()
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='flex h-full flex-col gap-y-8'>
				<FormField
					control={form.control}
					name='name'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Imię lub nazwa firmy</FormLabel>
							<FormControl>
								<Input {...field} placeholder='Jan Kowalski' />
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
								<Input {...field} placeholder='jan-kowalski@gmail.com' />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='message'
					render={({ field }) => (
						<FormItem className='flex grow flex-col'>
							<FormLabel>Wiadomość</FormLabel>
							<FormControl>
								<Textarea {...field} placeholder='Twoja wiadomość' className='grow' />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type='submit' className='w-full'>
					Wyślij wiadomość
				</Button>
			</form>
		</Form>
	)
}

export default ContactForm
