'use client'

import { Button } from '@/app/components/ui/Button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/app/components/ui/Card'
import { Input } from '@/app/components/ui/Input'
import { Label } from '@/app/components/ui/Label'
import { PasswordRequest, PasswordValidator } from '@/lib/validators/password'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { User } from 'next-auth'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'

type Props = {
	user: Pick<User, 'id'>
}

const ResetPassword = ({ user }: Props) => {
	const {
		handleSubmit,
		register,
		reset,
		formState: { errors }
	} = useForm<PasswordRequest>({
		resolver: zodResolver(PasswordValidator),
		defaultValues: {
			password: ''
		}
	})

	const { mutate: updatePassword, isLoading } = useMutation({
		mutationFn: async ({ password }: PasswordRequest) => {
			const payload: PasswordRequest = {
				password
			}

			const { data } = await axios.patch(`/api/password/reset`, payload)
			return data
		},
		onError: err => {
			if (err instanceof AxiosError) {
				if (err.response?.status === 401) {
					return toast.error('You are not authenticated')
				}
			}

			toast('Something went wrong.')
		},
		onSuccess: () => {
			toast.dismiss()
			toast.success('Your password has been updated.')

			reset()
		}
	})

	return (
		<form onSubmit={handleSubmit(e => updatePassword(e))}>
			<Card>
				<CardHeader>
					<CardTitle>Your new password</CardTitle>
					<CardDescription>Please choose a secure password that you will remember.</CardDescription>
				</CardHeader>

				<CardContent>
					<Label className='sr-only' htmlFor='name'>
						Password
					</Label>
					<Input
						id='password'
						className='w-[400px]'
						{...register('password')}
						type='password'
						placeholder='***********'></Input>

					{errors?.password && <p className='px-1 text-xs text-red-600'>{errors.password.message}</p>}
				</CardContent>

				<CardFooter>
					<Button type='submit' isLoading={isLoading}>
						Change password
					</Button>
				</CardFooter>
			</Card>
		</form>
	)
}

export default ResetPassword