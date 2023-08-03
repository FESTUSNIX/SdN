import { H2 } from '@/app/components/ui/Typography'
import Link from 'next/link'
import React from 'react'

type Props = {
	majors: {
		id: number
		name: string
		unitSlug: string
	}[]
}

const Majors = ({ majors }: Props) => {
	return (
		<section className='w-full'>
			<H2 className='mb-2'>Kierunki</H2>

			<div className='flex flex-wrap gap-4'>
				{majors.map(major => (
					<Link
						href={`/units/${major.unitSlug}/major/${major.id}`}
						key={major.id}
						className='flex w-full items-center justify-between rounded-md border border-border bg-background p-8'>
						<h3 className='text-lg'>{major.name}</h3>
					</Link>
				))}
			</div>
		</section>
	)
}

export default Majors
