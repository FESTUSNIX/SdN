import prisma from '@/prisma/client'
import React from 'react'
import { columns } from '../components/Majors/components/MajorsTable/Columns'
import { Metadata } from 'next'
import Majors from '../components/Majors'

type Props = {
	params: { unitId: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const id = params.unitId

	const unit = await prisma.unit.findFirst({
		where: {
			id: parseInt(id)
		},
		select: {
			name: true
		}
	})

	return {
		title: `${unit?.name ?? 'Unit'} - Majors`
	}
}

const MajorsPage = async ({ params: { unitId } }: Props) => {
	return (
		<div className='flex flex-col items-center md:h-screen'>
			<Majors unitId={parseInt(unitId)} />
		</div>
	)
}

export default MajorsPage
