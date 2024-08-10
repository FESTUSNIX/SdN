import { H2 } from '@/app/components/ui/Typography'
import Image from 'next/image'
import React from 'react'

type Props = {
	images: {
		src: string
		alt: string
	}[]
}

export const ImageGallery = ({ images }: Props) => {
	return (
		<section className='py-6'>
			<H2>Galeria zdjęć</H2>

			<div className='py-4'>
				<ul className='flex flex-wrap items-center gap-2'>
					{images.map((image, index) => (
						<li key={index} className='size-32 overflow-hidden rounded-md border'>
							<Image
								src={'/placeholder-image.jpg'}
								alt={image.alt}
								width={500}
								height={500}
								className='size-full object-cover'
							/>
						</li>
					))}
				</ul>
			</div>
		</section>
	)
}
