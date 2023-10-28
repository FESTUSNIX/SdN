'use client'

import { Button } from '@/app/components/ui/Button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/app/components/ui/Form'
import { MajorPayload, MajorValidator } from '@/lib/validators/major'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { ComponentType, ReactNode, useState } from 'react'
import {
    ControllerRenderProps,
    Path,
    useForm
} from 'react-hook-form'
import { z } from 'zod'

type Props<T extends MajorPayload, K extends keyof T> = {
	accessorKey: Path<T>
	defaultValue: T[K]
	Component: ComponentType<ControllerRenderProps>
} & {
	previewComponent?: React.ReactNode
}

export const EditField = <T extends MajorPayload, K extends keyof T>({
	accessorKey,
	defaultValue,
	previewComponent,
	Component
}: Props<T, K>) => {
	const [isEditing, setIsEditing] = useState(false)

	const FieldValidator = MajorValidator.pick({ [accessorKey]: true })

	const form = useForm<z.infer<typeof FieldValidator>>({
		resolver: zodResolver(FieldValidator),
		defaultValues: {
			[accessorKey]: defaultValue
		}
	})

	function onSubmit(data: z.infer<typeof FieldValidator>) {
		console.log(JSON.stringify(data, null, 2))

		form.reset()
		setIsEditing(false)
	}

	return (
		<>
			<div className='col-start-1 row-start-2'>
				{!isEditing && (
					<div className='break-all text-muted-foreground'>
						{previewComponent ?? ((defaultValue as ReactNode) || 'Brak danych')}
					</div>
				)}
				{isEditing && (
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)}>
							<FormField
								control={form.control}
								name={accessorKey}
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<div className='mt-2'>
												<Component {...field} />
											</div>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<Button type='submit' size={'sm'} className='ml-auto mt-2 flex'>
								Potwierdź
							</Button>
						</form>
					</Form>
				)}
			</div>
			<div className='row-span-full self-center justify-self-end'>
				<Button variant={'link'} type='button' onClick={() => setIsEditing(prev => !prev)}>
					{isEditing ? 'Anuluj' : 'Edytuj'}
				</Button>
			</div>
		</>
	)
}
