import { ClientSideDataTable } from '@/app/components/DataTable'
import prisma from '@/prisma/client'
import { Metadata } from 'next'
import { columns } from './components/QualificationsTable/Columns'
import RowActions from './components/QualificationsTable/RowActions'
import { qualificationTypeOptions } from './constants/qualificationTypeOptions'

export const metadata: Metadata = {
	title: 'Manage qualifications | SdN',
	description: 'Admin panel - qualifications'
}

export default async function QualificationsPage() {
	const qualifications = await prisma.qualification.findMany()

	return (
		<div className='flex flex-col items-center md:h-screen'>
			<ClientSideDataTable
				columns={columns}
				data={qualifications}
				filterableColumns={[
					{
						id: 'type',
						title: 'Type',
						options: qualificationTypeOptions
					}
				]}
				searchableColumns={[
					{
						id: 'name',
						title: 'Name'
					}
				]}
				RowActions={RowActions}
				buttonText='Add Qualification'
				sheetType='ADD_QUALIFICATION'
			/>
		</div>
	)
}
