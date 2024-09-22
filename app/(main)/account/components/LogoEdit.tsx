'use client'

import { updateUserAvatar } from '@/app/_actions'
import { Button, buttonVariants } from '@/app/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/app/components/ui/form'
import { Muted } from '@/app/components/ui/Typography'
import UserAvatar from '@/app/components/UserAvatar'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'
type Props = {
	defaultLogo: string | null
	username: string
	userId: string
}

const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
const MAX_FILE_SIZE = 3

const sizeInMB = (sizeInBytes: number, decimalsNum = 2) => {
	const result = sizeInBytes / (1024 * 1024)
	return +result.toFixed(decimalsNum)
}

export const LogoEditValidator = z.object({
	logo: z
		.any()
		.optional()
		.refine(file => !file || sizeInMB(file?.size) <= MAX_FILE_SIZE, `Maksymalny rozmiar zdjęcia to 3MB.`)
		.refine(
			file => !file || ACCEPTED_IMAGE_TYPES.includes(file?.type),
			'Akceptowane są tylko pliki .jpg, .jpeg, .png oraz .webp'
		)
})
export type LogoEditPayload = z.infer<typeof LogoEditValidator>

export const LogoEdit = ({ defaultLogo, username, userId }: Props) => {
	const router = useRouter()

	const form = useForm<LogoEditPayload>({
		resolver: zodResolver(LogoEditValidator),
		defaultValues: {
			logo: defaultLogo ?? undefined
		}
	})

	const { mutate: editLogo, isLoading } = useMutation({
		mutationFn: async (values: LogoEditPayload) => {
			const formData = new FormData()
			formData.append('newAvatar', values.logo ?? '')

			await updateUserAvatar(userId, formData, defaultLogo)

			return 'OK'
		},
		onError: err => {
			return toast.error('Coś poszło nie tak. Spróbuj ponownie')
		},
		onSuccess: (data, variables) => {
			toast.success('Pomyślnie edytowano avatar.')
			form.reset({ logo: variables.logo })
			router.refresh()
		}
	})

	const logo = form.watch('logo')
	const logoSrc = logo ? (logo instanceof File ? URL.createObjectURL(logo) : logo) : undefined

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(e => editLogo(e))}
				className='flex h-full w-full flex-wrap justify-between gap-x-6 gap-y-4 sm:gap-y-0'>
				<div className='mt-6 flex flex-wrap gap-x-8 gap-y-4'>
					<div className='relative size-32 shrink-0 overflow-hidden rounded-full border bg-secondary'>
						<UserAvatar
							user={{ image: logoSrc || null, name: username }}
							getPublicUrl={logo instanceof File ? false : true}
							className='h-full w-full border-none object-cover'
						/>
					</div>

					<div>
						<Muted className='mb-4 max-w-xs md:max-w-sm'>
							Zalecamy użycie zdjęcia o wielkości co najmniej 100 x 100 pikseli oraz 3 MB lub mniej. Dozwolone formaty
							zdjęcia to PNG, JPEG oraz WEBP.
						</Muted>
						<FormField
							control={form.control}
							name='logo'
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<div className='flex items-center gap-2'>
											<label
												className={cn(buttonVariants({ variant: 'secondary', size: 'sm' }), 'cursor-pointer px-4')}>
												<input
													type='file'
													{...field}
													onChange={e => {
														const files = e.target.files
														if (!files || files.length === 0) return

														field.onChange(files[0])
													}}
													value={undefined}
													tabIndex={-1}
													accept={ACCEPTED_IMAGE_TYPES.join(',')}
													className='hidden'
												/>
												<span>{logo ? 'Zmień' : 'Prześlij'}</span>
											</label>
											{logo && (
												<Button
													variant={'secondary'}
													size={'sm'}
													type='button'
													onClick={() => field.onChange(undefined)}
													className='px-4'>
													Usuń
												</Button>
											)}
										</div>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
				</div>

				{form.formState.isDirty && (
					<div className='ml-auto flex'>
						<Button
							variant={'link'}
							type='button'
							onClick={() => form.reset()}
							disabled={isLoading}
							className='flex items-center gap-1'>
							<span>Anuluj</span>
						</Button>

						<Button variant={'link'} type='submit' className='flex items-center gap-1'>
							<span>{isLoading ? 'Edytowanie...' : 'Potwierdź'}</span>
						</Button>
					</div>
				)}
			</form>
		</Form>
	)
}
