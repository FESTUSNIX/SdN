import { H1 } from '@/app/components/ui/Typography'
import { urlFor } from '@/lib/supabase/getUrlFor'
import prisma from '@/prisma/client'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import Majors from './components/Majors'

type Props = { params: { unitSlug: string } }

export async function generateStaticParams() {
	const units = await prisma.unit.findMany({
		select: {
			slug: true
		}
	})

	return units?.map(unit => ({
		unitSlug: unit.slug
	}))
}

export default async function UnitPage({ params }: Props) {
	const unit = await prisma.unit.findFirst({
		where: {
			slug: params.unitSlug
		},
		include: {
			majors: {
				select: {
					id: true,
					name: true,
					unitSlug: true
				}
			},
			city: {
				select: {
					name: true,
					voivodeship: true
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

	if (!unit) return notFound()

	return (
		<div className='wrapper flex flex-col items-center pt-12'>
			<H1 className='mb-24'>{unit.name}</H1>

			{unit.logo && (
				<Image src={urlFor('unit_logos', unit.logo).publicUrl} alt={`Logo ${unit.name}`} width={100} height={100} />
			)}

			<p>id - {unit.id}</p>
			<p>email - {unit.email}</p>
			<p>isPublic - {unit.isPublic}</p>
			<p>website - {unit.website}</p>
			<p>unitType - {unit.unitType}</p>
			<p>city - {unit.city.name}</p>
			<p>voivodeship - {unit.city.voivodeship.name}</p>
			<p>logo - {unit.logo}</p>
			<p>NIP - {unit.nip}</p>
			<p>Regon - {unit.regon}</p>
			<p>updatedAt - {JSON.stringify(new Date(unit.updatedAt ?? ''))}</p>
			<p>street - {unit.address?.street}</p>
			<p>postalCode - {unit.address?.postalCode}</p>
			<p>status - {unit.status}</p>
			<p>notes - {unit.notes}</p>

			{unit.majors && <Majors majors={unit.majors} />}
		</div>
	)
}
