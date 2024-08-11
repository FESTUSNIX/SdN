'use client'

import { FileUploader } from '@/app/components/FileUploader'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/app/components/ui/dialog'
import { urlFor } from '@/lib/supabase/getUrlFor'
import { UnitFormType } from '@/lib/validators/unit'
import { ImageIcon } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { ControllerRenderProps } from 'react-hook-form'

type Props = {
	images:
		| {
				url: string
				alt: string
		  }[]
		| undefined

	field: ControllerRenderProps<UnitFormType, 'gallery'>
}

const IMAGE_SLOTS = 12

export const GalleryPanel = ({ images, field }: Props) => {
	return (
		<div>
			<Dialog>
				<DialogTrigger>
					<p>OPEN GALLERY</p>
				</DialogTrigger>
				<DialogContent className='max-w-3xl'>
					<DialogHeader>
						<DialogTitle>Gallery</DialogTitle>
						<DialogDescription>Manage images in the gallery</DialogDescription>
					</DialogHeader>

					<p className='mt-4 text-sm text-muted-foreground'>
						{images?.length ?? 0}/{IMAGE_SLOTS} images uploaded
					</p>

					<div className=''>
						<ul className='mb-8 grid grid-cols-6 gap-2'>
							{images?.map((file, i) => (
								<li key={i} className='aspect-square h-auto w-full overflow-hidden rounded-md border'>
									<Image
										src={urlFor('units', file.url).publicUrl}
										alt={file.alt || ' '}
										width={500}
										height={500}
										className='size-full object-cover'
									/>
								</li>
							))}

							{Array.from({ length: IMAGE_SLOTS - (images?.length ?? 0) }).map((_, i) => (
								<li
									key={i}
									className='group flex aspect-square h-auto w-full items-center justify-center overflow-hidden rounded-md border bg-muted duration-300 hover:border-muted-foreground/50'>
									<ImageIcon className='size-8 text-muted-foreground duration-300 group-hover:scale-110' />
									<span className='sr-only'>Available slot</span>
								</li>
							))}
						</ul>

						<FileUploader
							value={field.value}
							onValueChange={field.onChange}
							maxFileCount={4}
							maxSize={4 * 1024 * 1024}
							// progresses={progresses}
							// pass the onUpload function here for direct upload
							// onUpload={uploadFiles}
							// disabled={isUploading}
						/>
					</div>
				</DialogContent>
			</Dialog>
		</div>
	)
}
