import { PlaceholderImage } from '@/app/components/PlaceholderImage'
import { Badge } from '@/app/components/ui/badge'
import { H1 } from '@/app/components/ui/Typography'
import { urlFor } from '@/lib/supabase/getUrlFor'
import { capitalize } from '@/lib/utils'
import { Unit } from '@prisma/client'
import { LinkIcon, MapPin } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

type Props = Pick<Unit, 'name' | 'logo' | 'unitType' | 'isPublic' | 'website' | 'updatedAt'> & {
	city: string
	voivodeship: string
}

const Header = ({ isPublic, logo, name, unitType, website, city, voivodeship }: Props) => {
	return (
		<header className='mt-12 flex flex-col gap-6 border-b py-6 lg:flex-row'>
			<div className='aspect-square max-h-full w-full max-w-60 overflow-hidden rounded-lg border bg-muted sm:max-w-72 md:mx-0 lg:max-w-48'>
				{logo ? (
					<Image
						src={urlFor('units', logo).publicUrl}
						alt={`Logo ${name}`}
						width={300}
						height={300}
						className='h-full w-full object-cover'
					/>
				) : (
					<PlaceholderImage className='aspect-square size-full border-none' />
				)}
			</div>

			<div>
				<H1 size='sm'>{name}</H1>

				<div className='mb-6 mt-4 flex items-center gap-2 text-sm font-medium'>
					<Badge variant={'secondary'}>
						<span className='inline-block first-letter:uppercase'>{unitType}</span>
					</Badge>
					<Badge variant={'secondary'}>{isPublic ? 'Publiczna' : 'Prywatna'}</Badge>
				</div>

				<div>
					<Link href={website} target='_blank' rel='noopener' className='my-2 block w-max break-all text-sm underline'>
						<span aria-hidden={true}>
							<LinkIcon className='mr-2 inline h-4 w-4 text-muted-foreground' />
						</span>
						<span>{website}</span>
					</Link>
					<a href={'#address'} className='my-2 block w-max text-sm underline'>
						<span aria-hidden={true}>
							<MapPin className='mr-2 inline h-4 w-4 text-muted-foreground' />
						</span>
						<span>
							{city}, {capitalize(voivodeship)}
						</span>
					</a>
				</div>
			</div>
		</header>
	)
}

export default Header
