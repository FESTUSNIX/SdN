import { ClientSideDataTable } from '@/app/components/DataTable'
import prisma from '@/prisma/client'
import { Metadata } from 'next'
import { UNIT_TYPE_OPTIONS } from '../constants/unitTypesOptions'
import { columns } from './components/UnitsTable/Columns'
import RowActions from './components/UnitsTable/RowActions'
import { WORK_STATUS_OPTIONS } from '@/app/constants/workStatusOptions'

export const metadata: Metadata = {
	title: 'Manage units'
}

export default async function UnitsPage() {
	const units = await prisma.unit.findMany({
		select: {
			id: true,
			slug: true,
			name: true,
			email: true,
			unitType: true,
			website: true,
			workStatus: true,
			city: {
				select: {
					name: true
				}
			},
			_count: {
				select: {
					majors: true
				}
			},
			subscriptions: {
				where: {
					to: {
						gte: new Date()
					}
				},
				select: {
					from: true,
					to: true,
					type: true
				}
			}
		}
	})

	return (
		<div className='flex w-full flex-col items-center md:h-screen'>
			<ClientSideDataTable
				// @ts-ignore
				columns={columns}
				data={units}
				filterableColumns={[
					{
						id: 'unitType',
						title: 'Type',
						options: UNIT_TYPE_OPTIONS
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
					},
					{
						id: 'email',
						title: 'Email'
					}
				]}
				RowActions={RowActions}
				buttonText='Add Unit'
				sheetType='ADD_UNIT'
			/>
		</div>
	)
}
