import { Card, CardFooter, CardHeader } from '@/app/components/ui/Card'
import { H3 } from '@/app/components/ui/Typography'
import { urlFor } from '@/lib/supabase/getUrlFor'
import { placeholderImage } from '@/lib/utils/placeholderImage'
import prisma from '@/prisma/client'
import { ArrowRight, Globe, Mail, Phone } from 'lucide-react'
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
			logo: true
		}
	})

	if (!unit) return <div>Nie można znaleźć jednostki</div>

	const { name, email, slug, logo, phone, website } = unit
	return (
		<Card>
			<CardHeader>
				<div className='flex'>
					<div>
						<Image
							src={urlFor('unit_logos', logo ?? '').publicUrl || placeholderImage}
							alt={`Logo ${name}`}
							width={100}
							height={100}
							className='mr-6 aspect-square w-16 rounded-md object-cover'
						/>
					</div>
					<div className='flex flex-col'>
						<H3 className='mb-4'>{name}</H3>
						<div className='flex flex-col gap-2'>
							{phone && (
								<div className='flex items-center gap-2'>
									<Phone className='h-4 w-4' />
									<span>{phone}</span>
								</div>
							)}
							{email && (
								<div className='flex items-center gap-2'>
									<Mail className='h-4 w-4' />
									<span>{email}</span>
								</div>
							)}
							{website && (
								<div className='flex items-center gap-2'>
									<Globe className='h-4 w-4' />
									<span>{website}</span>
								</div>
							)}
						</div>
					</div>
				</div>
			</CardHeader>
			<CardFooter className='justify-end'>
				<Link href={`/units/${slug}`} className='flex items-center hover:underline'>
					Zobacz więcej <ArrowRight className='ml-2 h-4 w-4' />
				</Link>
			</CardFooter>
		</Card>
	)
}

export default UnitCard
