import prisma from '@/prisma/client'
import { Metadata } from 'next'

import { ClientSideDataTable } from '@/app/components/DataTable'
import { MajorPayloadWithFullQualifications } from '@/lib/validators/major'
import { completionStatus } from '../units/constants/tableData'
import { columns } from './components/Columns'
import RowActions from '../units/[unitId]/components/Majors/components/MajorsTable/RowActions'

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
			unitId: true
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
		<div className='flex flex-col items-center md:h-screen'>
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
						options: completionStatus
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
		</div>
	)
}
