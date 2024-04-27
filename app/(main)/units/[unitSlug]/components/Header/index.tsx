import { Badge } from '@/app/components/ui/Badge'
import { H1, Muted } from '@/app/components/ui/Typography'
import { urlFor } from '@/lib/supabase/getUrlFor'
import { capitalize } from '@/lib/utils/capitalize'
import { placeholderImage } from '@/lib/utils/placeholderImage'
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
			<div className='mx-auto grid w-full max-w-full place-items-center overflow-hidden rounded-lg border bg-muted sm:max-w-[280px] md:mx-0 md:w-auto'>
				<Image
					src={logo ? urlFor('unit_logos', logo).publicUrl : placeholderImage}
					alt={`Logo ${name}`}
					width={300}
					height={300}
					className='aspect-square h-full w-full max-w-[200px] object-cover'
				/>
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
					<Link href={website} target='_blank' rel='noopener' className='my-2 block w-max text-sm underline'>
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
