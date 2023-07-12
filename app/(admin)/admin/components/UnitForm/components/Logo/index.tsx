import React, { useState } from 'react'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/app/components/ui/Form'
import { Input } from '@/app/components/ui/Input'
import { UnitFormType } from '@/lib/validators/unit'
import Image from 'next/image'
import { X } from 'lucide-react'
import { urlFor } from '@/lib/supabase/getUrlFor'

type Props = {
	form: UnitFormType
}

const Logo = ({ form }: Props) => {
	const [logo, setLogo] = useState<string | null>(form.getValues('logo'))

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e?.target?.files?.[0]) return
		form.setValue('logo', e?.target?.files?.[0])
		setLogo(URL.createObjectURL(e.target.files[0]))
	}

	return (
		<>
			<FormField
				control={form.control}
				name='logo'
				render={({ field }) => (
					<FormItem>
						<FormLabel>Logo</FormLabel>
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
											src={logo === form.formState.defaultValues?.logo ? urlFor('unit_logos', logo).publicUrl : logo}
											alt={`Units logo`}
											width={400}
											height={400}
											className='m-auto max-h-full'
										/>
										<div className='absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 duration-300 group-hover:opacity-100'>
											<div
												className='flex cursor-pointer items-center p-2 text-xl'
												onClick={() => {
													field.onChange(null)
													setLogo(null)
												}}>
												Remove
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
		</>
	)
}

export default Logo
