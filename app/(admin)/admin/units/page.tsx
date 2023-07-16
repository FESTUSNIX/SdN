import { ClientSideDataTable } from '@/app/components/DataTable'
import prisma from '@/prisma/client'
import { Status } from '@prisma/client'
import { Metadata } from 'next'
import { columns } from './components/UnitsTable/Columns'
import RowActions from './components/UnitsTable/RowActions'
import { completionStatus, unitTypes } from './constants/tableData'

export type TableUnitData = {
	id: number
	name: string
	email: string
	unitType: string
	website: string
	status: Status
	city: {
		name: string
	}
	_count: {
		majors: number
	}
}

export const metadata: Metadata = {
	title: 'Manage units'
}

export default async function UnitsPage() {
	const units = await prisma.unit.findMany({
		select: {
			id: true,
			name: true,
			email: true,
			unitType: true,
			website: true,
			status: true,
			city: {
				select: {
					name: true
				}
			},
			_count: {
				select: {
					majors: true
				}
			}
		}
	})

	return (
		<div className='flex flex-col items-center md:h-screen'>
			<ClientSideDataTable
				columns={columns}
				data={units}
				filterableColumns={[
					{
						id: 'unitType',
						title: 'Type',
						options: unitTypes
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
				buttonText='Add Unit'
				sheetType='ADD_UNIT'
			/>
		</div>
	)
}
