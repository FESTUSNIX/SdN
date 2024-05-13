import { STATUS_OPTIONS } from '@/app/(admin)/admin/constants/statusOptions'
import { ClientSideDataTable } from '@/app/components/DataTable'
import prisma from '@/prisma/client'
import { columns } from './components/MajorsTable/Columns'
import RowActions from './components/MajorsTable/RowActions'

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
	)
}

export default Majors
