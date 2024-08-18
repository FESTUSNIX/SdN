'use client'

import { FileUploader } from '@/app/components/FileUploader'
import { Lightbox, LightboxTrigger } from '@/app/components/Lightbox'
import { PlaceholderImage } from '@/app/components/PlaceholderImage'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/app/components/ui/dialog'
import { urlFor } from '@/lib/supabase/getUrlFor'
import { AnimatePresence, motion } from 'framer-motion'
import { RotateCcwIcon, XIcon } from 'lucide-react'
import Image from 'next/image'
import { UploadedFiles } from './UploadedFiles'

type Props = {
	images:
		| (
				| {
						url: string
						alt: string
				  }
				| File
		  )[]

	onChange: (images: (File | { url: string; alt: string })[]) => void
	isDirty: boolean
	resetField: () => void
}

const IMAGE_SLOTS = 12

export const GalleryPanel = ({ images, onChange, resetField, isDirty }: Props) => {
	const imagesWithPublicUrl = images?.map(img => {
		const src = img instanceof File ? URL.createObjectURL(img) : urlFor('units', img.url).publicUrl
		const alt = img instanceof File ? ' ' : img.alt

		return { src: src, alt: alt }
	})
	const availableSlots = IMAGE_SLOTS - (imagesWithPublicUrl?.length ?? 0)

	return (
		<div>
			<Dialog>
				<DialogTrigger className='w-full'>
					<UploadedFiles uploadedImages={imagesWithPublicUrl ?? []} />
				</DialogTrigger>
				<DialogContent className='max-w-3xl'>
					<DialogHeader>
						<DialogTitle>Galeria zdjęć</DialogTitle>
						<DialogDescription>
							Tutaj możesz dodać zdjęcia uczelni. Maksymalna ilość zdjęć to {IMAGE_SLOTS}.
						</DialogDescription>
					</DialogHeader>

					<div className='mt-4 flex w-full items-center justify-between gap-x-8'>
						<p className='text-sm text-muted-foreground'>
							{images?.length ?? 0}/{IMAGE_SLOTS} zdjęć
						</p>

						<button
							onClick={() => {
								resetField()
							}}
							disabled={!isDirty}
							className='flex items-center gap-1 text-sm text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50'>
							<RotateCcwIcon className='size-3' />
							<span>Resetuj</span>
						</button>
					</div>

					<div className=''>
						<ul className='mb-8 grid grid-cols-6 gap-2'>
							{imagesWithPublicUrl && imagesWithPublicUrl.length > 0 && (
								<Lightbox images={imagesWithPublicUrl ?? []}>
									<AnimatePresence initial={false} mode='popLayout'>
										{imagesWithPublicUrl?.map((file, i) => (
											<motion.li
												key={i}
												exit={{ opacity: 0.5, scale: 0, transition: { duration: 0.2 } }}
												className='group relative aspect-square h-auto w-full overflow-hidden rounded-md border'>
												<LightboxTrigger index={i}>
													<Image
														src={file.src}
														alt={file.alt || ' '}
														width={500}
														height={500}
														className='size-full object-cover'
													/>
												</LightboxTrigger>

												<button
													onClick={() => {
														const newImages = images?.filter((_, index) => index !== i)
														onChange(newImages)
													}}
													className='invisible absolute right-1 top-1 flex size-4 items-center justify-center rounded-full border bg-background text-muted-foreground opacity-0 duration-300 hover:bg-secondary hover:text-secondary-foreground group-hover:visible group-hover:opacity-100'>
													<XIcon className='size-3' />
												</button>
											</motion.li>
										))}
									</AnimatePresence>
								</Lightbox>
							)}

							{Array.from({ length: availableSlots }).map((_, i) => (
								<PlaceholderImage key={i} as='li' />
							))}
						</ul>

						<FileUploader
							value={images as any}
							onValueChange={onChange}
							maxFileCount={IMAGE_SLOTS}
							maxSize={4 * 1024 * 1024}
							showPreview={false}
							disabled={availableSlots === 0}
						/>
					</div>
				</DialogContent>
			</Dialog>
		</div>
	)
}
