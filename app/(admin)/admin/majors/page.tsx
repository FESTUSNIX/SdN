import prisma from '@/prisma/client'
import { Metadata } from 'next'
import { MajorsTable } from '../units/[unitId]/components/Majors/components/MajorsTable/MajorsTable'
import { columns } from './components/Columns'

export const metadata: Metadata = {
	title: 'Manage majors | SdN',
	description: 'Admin panel - majors'
}

export const revalidate = 0

export default async function MajorsPage() {
	const majors = await prisma.major.findMany({
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
		<div className='flex flex-col items-center md:h-screen'>
			<MajorsTable columns={columns} data={majors} disableAdd />
		</div>
	)
}
