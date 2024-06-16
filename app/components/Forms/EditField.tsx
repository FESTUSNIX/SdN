'use client'

import { revalidatePaths } from '@/app/_actions'
import { Button } from '@/app/components/ui/Button'
import { Form } from '@/app/components/ui/Form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { Loader2 } from 'lucide-react'
import React, { ReactNode, useState } from 'react'
import { Control, FieldPath, FieldValues, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'

type Props<T extends FieldValues, K extends keyof T> = {
	accessorKey: FieldPath<T>
	defaultValue: T[K]
	FormFieldComp: (props: { accessorKey: FieldPath<T>; control?: Control<T> }) => React.JSX.Element
} & {
	pathsToRevalidate?: string[]
	apiPath: string
	PreviewComponent?: (value: T[K]) => React.ReactNode
	schema: z.ZodObject<any>
	preparePayload?: (value: T[K]) => Promise<T[K]> | T[K]
}

export const EditField = <T extends FieldValues, K extends keyof T>({
	accessorKey,
	defaultValue,
	PreviewComponent,
	FormFieldComp,
	apiPath,
	schema,
	pathsToRevalidate,
	preparePayload
}: Props<T, K>) => {
	const [isEditing, setIsEditing] = useState(false)
	const [optimisticValue, setOptimisticValue] = useState(defaultValue)

	const FieldValidator = schema.pick({ [accessorKey]: true })
	type FieldPayload = z.infer<typeof FieldValidator>

	const form = useForm<FieldPayload>({
		resolver: zodResolver(FieldValidator),
		defaultValues: {
			[accessorKey]: defaultValue
		}
	})

	const { mutate: updateField, isLoading } = useMutation({
		mutationFn: async (values: FieldPayload) => {
			let payload: Partial<FieldPayload> = {
				...values,
				...(pathsToRevalidate && { pathsToRevalidate })
			}

			if (preparePayload) {
				const preparedValue = await preparePayload(values[accessorKey] as T[K])
				payload[accessorKey] = preparedValue
			}

			setOptimisticValue(values[accessorKey])
			setIsEditing(false)

			const { data } = await axios.patch(apiPath, payload)

			return values
		},
		onError: err => {
			toast.dismiss()
			setOptimisticValue(defaultValue)
			setIsEditing(true)

			if (err instanceof AxiosError) {
				if (err.response?.status === 404) {
					return toast.error('Nie odnaleziono danych do aktualizacji')
				}

				if (err.response?.status === 403) {
					return toast.error('Nie posiadasz wystarczających uprawnień')
				}

				if (err.response?.status === 422) {
					return toast.error('Nie poprawne dane')
				}
			}

			return toast.error('Coś poszło nie tak')
		},
		onSuccess: data => {
			toast.dismiss()

			pathsToRevalidate && revalidatePaths(pathsToRevalidate)

			form.reset()

			setIsEditing(false)
			setOptimisticValue(data[accessorKey])
		}
	})

	return (
		<>
			<div className='col-start-1 row-start-2'>
				{!isEditing && (
					<div className='break-all text-muted-foreground'>
						{(PreviewComponent && PreviewComponent(optimisticValue)) ??
							((optimisticValue as ReactNode) || 'Brak danych')}
					</div>
				)}
				{isEditing && (
					<Form {...form}>
						<form onSubmit={form.handleSubmit(e => updateField(e))}>
							<div className='mt-2'>
								<FormFieldComp control={form.control as unknown as Control<T>} accessorKey={accessorKey} />
							</div>

							<Button type='submit' disabled={isLoading} size={'sm'} className='ml-auto mt-2 flex'>
								{isLoading && <Loader2 className='h-4 w-4 animate-spin' />}
								{isLoading ? 'Aktualizowanie' : 'Aktualizuj'}
							</Button>
						</form>
					</Form>
				)}
			</div>
			<div className='row-span-full self-center justify-self-end'>
				<Button
					variant={'link'}
					type='button'
					onClick={() => {
						if (isEditing) {
							setIsEditing(false)
							form.reset()
						} else {
							setIsEditing(true)
						}
					}}>
					{isEditing ? 'Anuluj' : 'Edytuj'}
				</Button>
			</div>
		</>
	)
}
