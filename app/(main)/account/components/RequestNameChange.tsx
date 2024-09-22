'use client'

import { sendUserNameChangeRequest } from '@/app/_actions'
import { Button } from '@/app/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/app/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/app/components/ui/form'
import { Input } from '@/app/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'

type Props = {
	user: {
		id: string
		name: string
		email: string
	}
}

export const NameChangeValidator = z.object({
	name: z
		.string()
		.min(3, {
			message: 'Nazwa musi zawierać przynajmniej 3 znaki'
		})
		.max(255, {
			message: 'Nazwa nie może przekraczać 255 znaków'
		})
})
export type NameChangePayload = z.infer<typeof NameChangeValidator>

export const RequestNameChange = ({ user }: Props) => {
	const form = useForm<NameChangePayload>({
		resolver: zodResolver(NameChangeValidator),
		defaultValues: {
			name: ''
		}
	})

	const { mutate: editName, isLoading } = useMutation({
		mutationFn: async (values: NameChangePayload) => {
			const payload = {
				newName: values.name,
				user
			}

			await sendUserNameChangeRequest(payload)

			return 'OK'
		},
		onError: err => {
			return toast.error('Coś poszło nie tak. Spróbuj ponownie')
		},
		onSuccess: data => {
			toast.success('Pomyślnie wysłano prośbę.')
			form.reset()
		}
	})

	return (
		<div>
			<Dialog>
				<DialogTrigger asChild>
					<Button variant={'link'}>Zmień nazwę</Button>
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Zmiana nazwy konta</DialogTitle>
						<DialogDescription>
							Aby zmienić nazwę konta, wypełnij formularz poniżej. Zatwierdzenie nowej nazwy może zająć do 2 dni
							roboczych.
						</DialogDescription>
					</DialogHeader>

					<div>
						<Form {...form}>
							<form onSubmit={form.handleSubmit(e => editName(e))} className='flex h-full flex-col gap-y-6'>
								<FormField
									control={form.control}
									name='name'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Nowa nazwa</FormLabel>
											<FormControl>
												<Input {...field} placeholder='Wpisz nową nazwę' />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<Button type='submit' isLoading={isLoading}>
									Wyślij prośbę o zmianę nazwy
								</Button>
							</form>
						</Form>
					</div>
				</DialogContent>
			</Dialog>
		</div>
	)
}
