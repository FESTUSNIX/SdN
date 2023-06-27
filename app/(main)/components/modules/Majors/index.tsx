import { Major } from '@prisma/client'
import React from 'react'

type Props = {
	majors: Major[]
}

const Majors = ({ majors }: Props) => {

	return (
		<div className=''>
			<p className='mb-2 text-lg'>Kierunki</p>

			<div className='flex gap-4'>
				{majors.map(major => (
					<div key={major.id} className='py-2 px-4 border border-emerald-700/20 rounded-md'>
						<h3>{major.name}</h3>
					</div>
				))}
			</div>
		</div>
	)
}

export default Majors
