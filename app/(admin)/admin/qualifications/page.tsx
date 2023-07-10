import prisma from '@/prisma/client'
import { Metadata } from 'next'
import { columns } from './components/QualificationsTable/Columns'
import { QualificationsTable } from './components/QualificationsTable/QualificationsTable'

export const metadata: Metadata = {
	title: 'Manage qualifications | SdN',
	description: 'Admin panel - qualifications'
}

export const revalidate = 0

export default async function QualificationsPage() {
	const qualifications = await prisma.qualification.findMany({})

	return (
		<div className='flex flex-col items-center md:h-screen'>
			<QualificationsTable columns={columns} data={qualifications} />
		</div>
	)
}
