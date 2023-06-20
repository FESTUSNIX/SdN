import { Major, Unit } from '@prisma/client'
import React from 'react'
import { H1 } from '@/app/components/elements/Typography'
import Image from 'next/image'
import { urlFor } from '@/lib/supabase/getUrlFor'
import { getUnit } from '@/lib/prisma/getUnit'

type Props = { params: { unitId: number } }

const UnitPage = async ({ params }: Props) => {
	const unit = await getUnit(params.unitId)

	return (
		<main className='flex min-h-screen flex-col items-center wrapper pt-12'>
			<H1 className='mb-24'>{unit.name}</H1>

			{unit.logo && (
				<Image src={urlFor('unit_logos', unit.logo).publicUrl} alt={`Logo ${unit.name}`} width={100} height={100} />
			)}

			<div className='max-w-full break-all'>{JSON.stringify(unit)}</div>
		</main>
	)
}

export default UnitPage