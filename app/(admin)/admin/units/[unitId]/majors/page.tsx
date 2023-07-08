import prisma from '@/prisma/client'
import React from 'react'
import { MajorsTable } from '../components/Majors/components/MajorsTable/MajorsTable'
import { columns } from '../components/Majors/components/MajorsTable/Columns'
import { Metadata } from 'next'

type Props = {
	params: { unitId: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const id = params.unitId

	const unit = await prisma.unit.findFirst({
		where: {
			id: parseInt(id)
		}
	})

	return {
		title: `${unit?.name} | SdN`
	}
}

const MajorsPage = async ({ params: { unitId } }: Props) => {
	const majors = await prisma.major.findMany({
		where: {
			unitId: parseInt(unitId)
		},
		select: {
			id: true,
			name: true,
			majorLevel: true,
			status: true,
			qualifications: {
				select: {
					id: true,
					name: true,
					type: true
				}
			},
			unitId: true
		}
	})

	return (
		<div className='mt-12'>
			<MajorsTable data={majors} columns={columns} />
		</div>
	)
}

export default MajorsPage
