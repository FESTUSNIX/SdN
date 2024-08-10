'use client'

import { Button } from '@/app/components/ui/Button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/app/components/ui/Form'
import { Input } from '@/app/components/ui/Input'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { z } from 'zod'

const FormSchema = z.object({
	email: z.string().email({ message: 'Podaj poprawny email.' })
})

const EmailForm = () => {
	const form = useForm<z.infer<typeof FormSchema>>({
		defaultValues: {
			email: ''
		},
		resolver: zodResolver(FormSchema)
	})

	function onSubmit(data: z.infer<typeof FormSchema>) {
		toast.success(`Submited email: ${data.email}`)
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<FormField
					control={form.control}
					name='email'
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<>
									<label
										className={cn(
											'relative hidden w-full cursor-text items-center overflow-hidden rounded-full border border-input bg-transparent ring-offset-background focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 sm:flex'
										)}>
										<input
											type='email'
											autoComplete={'off'}
											placeholder='Wprowadź swój adres email'
											{...field}
											className='h-full grow bg-transparent py-2 pl-6 pr-2 text-sm outline-none placeholder:text-muted-foreground md:text-lg'
										/>

										<Button className='shrink-0 rounded-full px-6 py-7 font-normal md:text-lg' type='submit'>
											Powiadom mnie
										</Button>
									</label>

									<div className='flex flex-col space-y-2 sm:hidden'>
										<Input
											type='email'
											autoComplete={'off'}
											placeholder='Wprowadź swój adres email'
											{...field}
											className='h-auto rounded-full py-4 pl-6 pr-2'
										/>
										<Button className='grow rounded-full px-6 py-7 font-normal md:text-lg' type='submit'>
											Powiadom mnie
										</Button>
									</div>
								</>
							</FormControl>

							<FormMessage className='text-left' />
						</FormItem>
					)}
				/>
			</form>
		</Form>
	)
}

export default EmailForm
