import { PlaceholderImage } from '@/app/components/PlaceholderImage'
import Image from 'next/image'
import { Lightbox, LightboxTrigger } from '../Lightbox'

type Props = {
	uploadedImages: { src: string; alt: string }[]
	hoverEffect?: boolean
}

export function UploadedFiles({ uploadedImages, hoverEffect = true }: Props) {
	const MAX_TILE_COUNT = 4
	const totalImages = uploadedImages?.length

	return (
		<div className='group relative rounded-md'>
			{hoverEffect && (
				<div className='absolute -inset-1.5 z-10 flex items-center justify-center rounded-lg border-2 border-dashed bg-secondary/50 opacity-0 duration-300 group-hover:opacity-100'>
					<p className='scale-50 text-lg duration-300 group-hover:scale-100 group-active:scale-90'>Zarządzaj galerią</p>
				</div>
			)}

			<Lightbox images={uploadedImages}>
				<ul className='grid grid-cols-4 gap-2'>
					{uploadedImages?.slice(0, 3).map((img, i) => (
						<li key={i} className='relative aspect-square h-auto w-full'>
							<LightboxTrigger index={i}>
								<Image
									src={img.src || ' '}
									alt={img.alt || ' '}
									loading='lazy'
									width={150}
									height={150}
									className='size-full rounded-md object-cover'
								/>
							</LightboxTrigger>
						</li>
					))}

					{totalImages <= 3 ? (
						<>
							{[...Array(MAX_TILE_COUNT - totalImages)].map((_, i) => (
								<PlaceholderImage key={i} as='li' />
							))}
						</>
					) : (
						<li className='group size-full overflow-hidden rounded-md border bg-muted duration-300 hover:border-muted-foreground/50'>
							<LightboxTrigger index={3} className='block flex size-full items-center justify-center'>
								<span className='text-muted-foreground'>+{totalImages - 3}</span>
							</LightboxTrigger>
						</li>
					)}
				</ul>
			</Lightbox>
		</div>
	)
}
