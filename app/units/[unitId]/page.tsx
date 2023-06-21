import { Major, Unit } from '@prisma/client'
import React from 'react'
import Majors from './components/Majors'
import { H1 } from '@/app/components/elements/Typography'
import Image from 'next/image'
import { urlFor } from '@/lib/supabase/getUrlFor'
import { getUnits } from '@/lib/prisma/getUnits'
import { getUnit } from '@/lib/prisma/getUnit'

type Props = { params: { unitId: number } }

// export async function generateStaticParams() {
// 	const units = await getUnits()

// 	return units.map((unit: any) => ({
// 		unitId: unit.id.toString()
// 	}))
// }

export default async function UnitPage({ params }: Props) {
	const unit = await getUnit(params.unitId)

	return (
		<main className='flex min-h-screen flex-col items-center wrapper pt-12'>
			<H1 className='mb-24'>{unit.name}</H1>

			{unit.logo && (
				<Image src={urlFor('unit_logos', unit.logo).publicUrl} alt={`Logo ${unit.name}`} width={100} height={100} />
			)}

			<p>isPublic - {unit.isPublic}</p>
			<p>NIP - {unit.nip}</p>
			<p>Regon - {unit.regon}</p>
			<p>unitType - {unit.unitType}</p>
			<p>website - {unit.website}</p>

			{unit.majors && <Majors majors={unit.majors} />}
		</main>
	)
}
