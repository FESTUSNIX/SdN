import { Lightbox, LightboxTrigger } from '@/app/components/Lightbox'
import { H2 } from '@/app/components/ui/Typography'
import { urlFor } from '@/lib/supabase/getUrlFor'
import Image from 'next/image'

type Props = {
	images: {
		url: string
		alt: string
	}[]
}

export const ImageGallery = ({ images }: Props) => {
	return (
		<section className='py-6'>
			<H2>Galeria zdjęć</H2>

			<ul className='grid grid-cols-6 gap-2 py-4'>
				<Lightbox images={images.map(img => ({ src: urlFor('units', img.url).publicUrl, ...img }))}>
					{images.map((image, i) => (
						<li key={i} className='aspect-square h-auto w-full overflow-hidden rounded-md border'>
							<LightboxTrigger index={i}>
								<Image
									src={urlFor('units', image.url).publicUrl}
									alt={image.alt || ' '}
									width={600}
									height={600}
									loading='lazy'
									className='size-full max-h-dvh object-cover'
								/>
							</LightboxTrigger>
						</li>
					))}
				</Lightbox>
			</ul>
		</section>
	)
}
