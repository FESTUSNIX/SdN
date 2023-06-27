import { H1 } from '@/app/components/ui/Typography'
import { urlFor } from '@/lib/supabase/getUrlFor'
import prisma from '@/prisma/client'
import Image from 'next/image'
import { notFound } from 'next/navigation'

type Props = { params: { unitId: string } }

export async function generateStaticParams() {
	const units = await prisma.unit.findMany({
		select: {
			id: true
		}
	})

	return units.map(unit => ({
		unitId: unit.id.toString()
	}))
}

const AdminUnitPage = async ({ params: { unitId } }: Props) => {
	const unit = await prisma.unit.findFirst({
		where: {
			id: parseInt(unitId)
		},
		include: {
			city: {
				select: {
					id: true,
					name: true,
					voivodeship: true
				}
			},
			majors: {
				select: {
					id: true,
					name: true,
					unitId: true
				}
			},
			address: {
				select: {
					id: true,
					street: true,
					city: true,
					postalCode: true
				}
			}
		}
	})

	if (!unit) return notFound()

	return (
		<div className='flex min-h-screen flex-col items-center wrapper pt-12'>
			<H1 className='mb-24'>{unit.name}</H1>

			{unit.logo && (
				<Image src={urlFor('unit_logos', unit.logo).publicUrl} alt={`Logo ${unit.name}`} width={100} height={100} />
			)}

			<div className='max-w-full break-all'>{JSON.stringify(unit)}</div>
		</div>
	)
}

export default AdminUnitPage
