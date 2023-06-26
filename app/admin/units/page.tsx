import { H1 } from '@/app/components/ui/Typography'
import prisma from '@/prisma/client'
import UnitForm from '../components/modules/UnitForm'
import { columns } from './components/Columns'
import { DataTable } from './components/DataTable'
import { UnitStatus } from '@prisma/client'
import { FormContextProvider } from './context/FormContext'
import AddUnitForm from './components/AddUnitForm'
import EditUnitForm from './components/EditUnitForm'
import { z } from 'zod'
import { Metadata } from 'next'

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
	description: 'Admin panel - units',

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
			}
		}
	})

	return (
		<div className='flex flex-col items-center md:h-[calc(100vh-73px)]'>
			<FormContextProvider>
				<DataTable columns={columns} data={units} />

				<EditUnitForm />
				<AddUnitForm />
			</FormContextProvider>
		</div>
	)
}
