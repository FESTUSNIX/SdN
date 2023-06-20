import { Major, Unit } from '@prisma/client'
import React from 'react'
import Majors from './components/Majors'
import { H1 } from '@/app/components/elements/Typography'
import Image from 'next/image'
import { urlFor } from '@/lib/supabase/getUrlFor'

type Props = { params: { unitId: number } }

const UnitPage = async ({ params }: Props) => {
	const res = await fetch(`${process.env.NEXT_PUBLIC_URL ?? ''}/api/getUnit?id=${params.unitId}`)

	if (!res.ok) {
		console.log(res)
		throw new Error('Failed to fetch')
	}

	const unit: Unit & { majors: Major[] } = await res.json()

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

export default UnitPage
