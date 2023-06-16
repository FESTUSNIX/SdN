import { Major } from '@prisma/client'
import Link from 'next/link'
import React from 'react'

type Props = {
	majors: Major[]
}

const Majors = ({ majors }: Props) => {
	return (
		<section className='w-full'>
			<h2 className='text-2xl font-semibold mb-16'>Kierunki</h2>

			<div className='flex gap-4 flex-wrap'>
				{majors.map(major => (
					<Link
						href={`/unit/${major.unitId}/major/${major.id}`}
						key={major.id}
						className='p-8 w-full rounded-md bg-emerald-800/20 border border-emerald-700/20 flex justify-between items-center'>
						<h3 className='text-lg'>{major.name}</h3>
					</Link>
				))}
			</div>
		</section>
	)
}

export default Majors
