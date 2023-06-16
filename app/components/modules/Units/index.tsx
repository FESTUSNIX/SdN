import React from 'react'
import { Major, Unit } from '@prisma/client'
import Image from 'next/image'
import { getUnits } from '@/lib/prisma/getUnits'
import Majors from '../Majors'
import Link from 'next/link'

type Props = {}

const Units = async (props: Props) => {
	const res = await fetch(`${process.env.BASE_URL}/api/getUnits`)

	if (!res.ok) {
		console.log(res)
		throw new Error('Failed to fetch')
	}

	const units: (Unit & { majors: Major[] })[] = await res.json()

	return (
		<section className='py-24 w-full'>
			<div className='flex flex-col gap-4'>
				{units.map(unit => (
					<Link
						href={`/unit/${unit.id}`}
						key={unit.id}
						className='p-8 w-full rounded-md bg-emerald-800/20 border border-emerald-700/20'>
						<h2 className='text-xl font-semibold'>{unit.name}</h2>
						<p className='text-neutral-500 text-sm mb-8'>ID - {unit.id}</p>

						<Majors majors={unit.majors} />
					</Link>
				))}
			</div>
		</section>
	)
}

export default Units
