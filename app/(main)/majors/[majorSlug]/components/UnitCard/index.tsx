import { buttonVariants } from '@/app/components/ui/Button'
import { urlFor } from '@/lib/supabase/getUrlFor'
import { capitalize } from '@/lib/utils/capitalize'
import { placeholderImage } from '@/lib/utils/placeholderImage'
import { cn } from '@/lib/utils/utils'
import prisma from '@/prisma/client'
import { ArrowRight, LinkIcon, MailIcon, MapPin, PhoneIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
	unitId: number
}

const UnitCard = async ({ unitId }: Props) => {
	const unit = await prisma.unit.findFirst({
		where: {
			id: unitId
		},
		select: {
			name: true,
			phone: true,
			slug: true,
			email: true,
			website: true,
			logo: true,
			city: {
				select: {
					name: true,
					voivodeship: {
						select: {
							name: true
						}
					}
				}
			},
			address: {
				select: {
					street: true,
					postalCode: true
				}
			}
		}
	})

	if (!unit) return <div>Nie można znaleźć jednostki</div>

	const {
		name,
		email,
		slug,
		logo,
		phone,
		website,
		city: {
			name: city,
			voivodeship: { name: voivodeship }
		},
		address
	} = unit

	const createAddressString = () => {
		const street = address?.street
		const postalCode = address?.postalCode ?? ''

		return `${street ? `${street}, ` : ''}${city}${postalCode ? ` ${postalCode}` : ''}, ${capitalize(voivodeship)}`
	}

	const createPhoneHref = (phone: string) => {
		const phoneDigits = phone.replace(/\D/g, '')

		return `tel:${phoneDigits}`
	}

	const createMailHref = (email: string) => {
		return `mailto:${email.split(',')[0].trim()}`
	}

	return (
		<div className='flex flex-col gap-12 rounded-2xl border p-4 sm:p-6 lg:flex-row lg:justify-between'>
			<div className='flex grow flex-row flex-wrap gap-6 sm:flex-nowrap'>
				<Link
					href={`/units/${slug}`}
					className='aspect-square size-24 min-h-full w-auto shrink-0 overflow-hidden rounded-xl border bg-secondary'>
					<Image
						src={urlFor('unit_logos', logo ?? '').publicUrl || placeholderImage}
						alt={`Logo ${name}`}
						width={200}
						height={200}
						className='h-full w-full object-cover'
					/>
				</Link>
				<div className='flex max-w-full flex-col'>
					<Link href={`/units/${slug}`} className='w-max hover:underline'>
						<h3 className='mb-3 w-max max-w-lg text-lg font-semibold md:text-xl'>{name}</h3>
					</Link>
					<div className='flex flex-col gap-2'>
						<div className='flex max-w-full flex-col gap-2'>
							<Link href={website} target='_blank' rel='noopener' className='block w-max max-w-full text-sm underline'>
								<span aria-hidden={true}>
									<LinkIcon className='mr-2 inline h-4 w-4 text-muted-foreground' />
								</span>
								<span>{website}</span>
							</Link>
							<Link
								href={`https://www.google.com/maps/search/?api=1&query=${encodeURI(createAddressString())}`}
								target='_blank'
								rel='noopener'
								className='block w-max max-w-full text-sm underline'>
								<span aria-hidden={true}>
									<MapPin className='mr-2 inline h-4 w-4 text-muted-foreground' />
								</span>
								<span>{createAddressString()}</span>
							</Link>
						</div>
					</div>
				</div>
			</div>

			<div className='flex flex-wrap items-center justify-between gap-6 lg:min-h-full lg:flex-col lg:items-end'>
				<div className='flex w-max items-center gap-2 max-sm:flex-wrap lg:flex-col xl:flex-row'>
					{phone && (
						<Link
							href={createPhoneHref(phone)}
							className={cn(buttonVariants({ size: 'sm', variant: 'secondary' }), 'gap-2 px-3 sm:px-6 lg:w-full')}>
							<PhoneIcon className='size-3.5' />
							<span>Zadzwoń</span>
						</Link>
					)}
					{email && (
						<Link
							href={createMailHref(email)}
							className={cn(buttonVariants({ size: 'sm', variant: 'secondary' }), 'gap-2 px-3 sm:px-6 lg:w-full')}>
							<MailIcon className='size-3.5' />
							<span>Napisz</span>
						</Link>
					)}
				</div>
				<Link href={`/units/${slug}`} className='flex items-center hover:underline'>
					Zobacz więcej <ArrowRight className='ml-2 h-4 w-4' />
				</Link>
			</div>
		</div>
	)
}

export default UnitCard
