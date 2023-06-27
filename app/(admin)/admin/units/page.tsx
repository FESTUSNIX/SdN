import prisma from '@/prisma/client'
import { UnitStatus } from '@prisma/client'
import { Metadata } from 'next'
import AddUnitForm from './components/AddUnitForm'
import { columns } from './components/Columns'
import { DataTable } from './components/DataTable'
import EditUnitForm from './components/EditUnitForm'
import { FormContextProvider } from './context/FormContext'
export type TableUnitData = {
	id: number
	name: string
	email: string
	unitType: string
	website: string
	status: UnitStatus
	city: {
		name: string
	}
}

export const metadata: Metadata = {
	title: 'SdN | Manage units',
	description: 'Admin panel - units'
}

export const revalidate = 0

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
			}
		}
	})

	return (
		<div className='flex flex-col items-center md:h-screen'>
			<FormContextProvider>
				<DataTable columns={columns} data={units} />

				<EditUnitForm />
				<AddUnitForm />
			</FormContextProvider>
		</div>
	)
}
