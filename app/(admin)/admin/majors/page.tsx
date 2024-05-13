import { ClientSideDataTable } from '@/app/components/DataTable'
import prisma from '@/prisma/client'
import { Metadata } from 'next'
import { STATUS_OPTIONS } from '../constants/statusOptions'
import RowActions from '../units/[unitId]/components/Majors/components/MajorsTable/RowActions'
import { columns } from './components/Columns'

export const metadata: Metadata = {
	title: 'Manage Majors'
}

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
			unitId: true,
			keywords: true
		}
	})

	const qualificationsOptions = await prisma.qualification.findMany({
		orderBy: {
			name: 'asc'
		}
	})

	const qualificationsOptionsFormated = qualificationsOptions?.map((qualification: any) => ({
		label: qualification.name,
		value: qualification.id
	}))

	return (
		<main className='flex w-full flex-col items-center md:h-screen'>
			<ClientSideDataTable
				columns={columns}
				data={majors}
				filterableColumns={[
					{
						id: 'qualifications',
						title: 'Qualifications',
						options: qualificationsOptionsFormated
					},
					{
						id: 'status',
						title: 'Status',
						options: STATUS_OPTIONS
					}
				]}
				searchableColumns={[
					{
						id: 'name',
						title: 'Name'
					}
				]}
				RowActions={RowActions}
				buttonText='Add Major'
				sheetType='ADD_MAJOR'
			/>
		</main>
	)
}
