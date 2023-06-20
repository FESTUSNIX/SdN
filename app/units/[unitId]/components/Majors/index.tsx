import { H2 } from '@/app/components/elements/Typography'
import { Major } from '@prisma/client'
import Link from 'next/link'
import React from 'react'

type Props = {
	majors: {
		id: number
		name: string
		unitId: number
	}[]
}

const Majors = ({ majors }: Props) => {
	return (
		<section className='w-full'>
			<H2 className='mb-2'>Kierunki</H2>

			<div className='flex gap-4 flex-wrap'>
				{majors.map(major => (
					<Link
						href={`/units/${major.unitId}/major/${major.id}`}
						key={major.id}
						className='p-8 w-full rounded-md bg-background border border-border flex justify-between items-center'>
						<h3 className='text-lg'>{major.name}</h3>
					</Link>
				))}
			</div>
		</section>
	)
}

export default Majors
