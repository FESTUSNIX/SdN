import { ClientSideDataTable } from '@/app/components/DataTable'
import prisma from '@/prisma/client'
import { columns } from './components/MajorsTable/Columns'
import RowActions from './components/MajorsTable/RowActions'
import { WORK_STATUS_OPTIONS } from '@/app/constants/workStatusOptions'

type Props = {
	unitId: number
}

const Majors = async ({ unitId }: Props) => {
	const majors = await prisma.major.findMany({
		where: {
			unitId
		},
		select: {
			id: true,
			name: true,
			majorLevel: true,
			workStatus: true,
			qualifications: {
				select: {
					id: true,
					name: true,
					type: true
				}
			},
			unitId: true,
			url: true
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
					id: 'workStatus',
					title: 'Work status',
					options: WORK_STATUS_OPTIONS
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
	)
}

export default Majors
