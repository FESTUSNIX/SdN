'use client'

import { Button } from '@/app/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/app/components/ui/form'
import { Input } from '@/app/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/app/components/ui/radio-group'
import { Textarea } from '@/app/components/ui/textarea'
import { ContactEmailPayload, ContactEmailValidator, EMAIL_TOPICS } from '@/lib/validators/contactForm'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { ArrowUpRight } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'

const ContactForm = () => {
	const form = useForm<ContactEmailPayload>({
		resolver: zodResolver(ContactEmailValidator),
		defaultValues: {
			name: '',
			email: '',
			message: '',
			phone: '',
			topic: undefined
		}
	})

	const { mutate: sendEmail, isLoading } = useMutation({
		mutationFn: async (values: ContactEmailPayload) => {
			const res = await fetch('/api/contactForm', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(values)
			})

			if (!res.ok) throw new Error('Could not send email')

			return 'OK'
		},
		onError: err => {
			return toast.error('Coś poszło nie tak. Spróbuj ponownie')
		},
		onSuccess: data => {
			toast.success('Wiadomość pomyślnie wysłana')
			form.reset()
		}
	})

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(e => sendEmail(e))} className='flex h-full flex-col gap-y-6'>
				<FormField
					control={form.control}
					name='name'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Pełne imię lub nazwa uczelni*</FormLabel>
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
							<FormLabel>Adres email*</FormLabel>
							<FormControl>
								<Input {...field} placeholder='jan-kowalski@gmail.com' />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='phone'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Numer telefonu</FormLabel>
							<FormControl>
								<Input {...field} placeholder='+48 123 456 789' />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='message'
					render={({ field }) => (
						<FormItem className='flex flex-col'>
							<FormLabel>Wiadomość*</FormLabel>
							<FormControl>
								<Textarea {...field} placeholder='Twoja wiadomość...' className='max-h-64 min-h-32 grow' />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='topic'
					render={({ field }) => (
						<FormItem className='@container'>
							<FormLabel className='mb-2'>Temat*</FormLabel>
							<FormControl>
								<RadioGroup
									onValueChange={field.onChange}
									defaultValue={field.value}
									className='grid max-w-md grid-cols-1 @md:grid-cols-2'>
									{EMAIL_TOPICS.map(({ value, label }) => (
										<FormItem key={value} className='flex items-center space-x-3 space-y-0'>
											<FormControl>
												<RadioGroupItem value={value} />
											</FormControl>
											<FormLabel className='font-normal'>{label}</FormLabel>
										</FormItem>
									))}
								</RadioGroup>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className='mt-4 space-y-2'>
					<Button type='submit' disabled={isLoading} className='flex w-full items-center gap-2 rounded-full'>
						<span>{isLoading ? 'Wysyłanie wiadomości...' : 'Wyślij wiadomość'}</span>
						<ArrowUpRight className='size-4' />
					</Button>
					<p className='text-xs text-muted-foreground'>* Pola wymagane</p>
				</div>
			</form>
		</Form>
	)
}

export default ContactForm
