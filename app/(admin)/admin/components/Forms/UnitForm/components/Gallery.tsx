'use client'

import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/app/components/ui/Form'
import { Input } from '@/app/components/ui/Input'
import { urlFor } from '@/lib/supabase/getUrlFor'
import { UnitFormType } from '@/lib/validators/unit'
import { X } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'
import { ReactHookFormDemo } from './FileUploader'
import { FileUploader } from '@/app/components/FileUploader'
import { UploadedFilesCard } from './UploadedFilesCard'
import { GalleryPanel } from './GalleryPanel'

type Props = {
	form: UnitFormType
}

export const Gallery = ({ form }: Props) => {
	return (
		<>
			<FormField
				control={form.control}
				name='gallery'
				render={({ field }) => (
					<div className='space-y-6'>
						<FormItem className='w-full'>
							<FormLabel>Images</FormLabel>
							<FormControl>
								<GalleryPanel images={field.value as any} field={field} />
							</FormControl>
							<FormMessage />
						</FormItem>
						{/* {uploadedFiles.length > 0 ? <UploadedFilesCard uploadedFiles={uploadedFiles} /> : null} */}
					</div>
				)}
			/>
		</>
	)
}
