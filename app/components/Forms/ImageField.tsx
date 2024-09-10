'use client'

import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/app/components/ui/form'
import { Input } from '@/app/components/ui/input'
import { urlFor } from '@/lib/supabase/getUrlFor'
import { XIcon } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { Control, FieldPath, FieldValues, useFormContext } from 'react-hook-form'

type Props<T extends FieldValues> = {
	accessorKey: FieldPath<T>
	control?: Control<T>
	label?: string
	description?: string
	bucket: string
	pathToFile?: string
}

export const ImageField = <T extends FieldValues>({
	accessorKey,
	control,
	label,
	description,
	bucket,
	pathToFile
}: Props<T>) => {
	const { getValues, setValue, formState } = useFormContext()

	const [image, setImage] = useState<string | null>(getValues(accessorKey))

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e?.target?.files?.[0]) return
		setValue(accessorKey, e?.target?.files?.[0] as any)
		setImage(URL.createObjectURL(e.target.files[0]))
	}

	return (
		<>
			<FormField
				control={control}
				name={accessorKey}
				render={({ field }) => (
					<FormItem>
						<FormLabel>{label}</FormLabel>
						<FormControl>
							<>
								{
									<Input
										type='file'
										name={field.name}
										ref={field.ref}
										onBlur={field.onBlur}
										value={undefined}
										onChange={handleChange}
									/>
								}
								{image && (
									<div className='group relative w-full overflow-hidden rounded-md border'>
										<Image
											src={
												image === formState.defaultValues?.[accessorKey]
													? urlFor(bucket, pathToFile ? `${pathToFile}${image}` : image).publicUrl
													: image
											}
											alt={`Image`}
											width={400}
											height={400}
											className='m-auto max-h-full'
										/>
										<div className='absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 duration-300 group-hover:opacity-100'>
											<div
												className='flex cursor-pointer items-center p-2 text-xl'
												onClick={() => {
													field.onChange(null)
													setImage(null)
												}}>
												Remove
												<XIcon className='ml-2 h-6 w-6' />
											</div>
										</div>
									</div>
								)}
							</>
						</FormControl>
						<FormDescription>{description}</FormDescription>
						<FormMessage />
					</FormItem>
				)}
			/>
		</>
	)
}
