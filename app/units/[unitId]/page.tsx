import { Major, Unit } from '@prisma/client'
import React from 'react'
import Majors from './components/Majors'
import { H1 } from '@/app/components/elements/Typography'

type Props = { params: { unitId: number } }

const UnitPage = async ({ params }: Props) => {
	const res = await fetch(`${process.env.BASE_URL}/api/getUnit?id=${params.unitId}`)

	if (!res.ok) {
		console.log(res)
		throw new Error('Failed to fetch')
	}

	const unit: Unit & { majors: Major[] } = await res.json()

	console.log(unit)

	return (
		<main className='flex min-h-screen flex-col items-center wrapper pt-12'>
			<H1 className='mb-24'>{unit.name}</H1>

			<Majors majors={unit.majors} />
		</main>
	)
}

export default UnitPage
