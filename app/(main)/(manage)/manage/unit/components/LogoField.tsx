import { FormControl, FormDescription, FormField, FormItem, FormMessage } from '@/app/components/ui/Form'
import { Input } from '@/app/components/ui/Input'
import { urlFor } from '@/lib/supabase/getUrlFor'
import { X } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'
import { useFormContext } from 'react-hook-form'

export const LogoField = () => {
	const form = useFormContext()
	const [logo, setLogo] = useState<string | null>(form.getValues('logo'))

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e?.target?.files?.[0]) return
		form.setValue('logo', e?.target?.files?.[0])
		setLogo(URL.createObjectURL(e.target.files[0]))
	}

	return (
		<FormField
			control={form.control}
			name='logo'
			render={({ field }) => (
				<FormItem>
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
							{logo && (
								<div className='group relative w-full overflow-hidden rounded-md border'>
									<Image
										src={logo === form.formState.defaultValues?.logo ? urlFor('units', logo).publicUrl : logo}
										alt={`Logo uczelni`}
										width={400}
										height={400}
										className='m-auto max-h-full'
									/>
									<div className='absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 duration-300 group-hover:opacity-100'>
										<div
											className='flex cursor-pointer items-center p-2 text-xl text-white'
											onClick={() => {
												field.onChange(null)
												setLogo(null)
											}}>
											Usuń
											<X className='ml-2 h-6 w-6' />
										</div>
									</div>
								</div>
							)}
						</>
					</FormControl>
					<FormDescription>Max 6MB</FormDescription>
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}
