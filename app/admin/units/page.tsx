import { H1 } from '@/app/components/ui/Typography'
import prisma from '@/prisma/client'
import UnitForm from '../components/modules/UnitForm'
import { columns } from './components/Columns'
import { DataTable } from './components/DataTable'
import { UnitStatus } from '@prisma/client'
import { FormContextProvider } from './context/FormContext'
import AddUnitForm from './components/AddUnitForm'
import EditUnitForm from './components/EditUnitForm'

export type TableUnitData = {
	id: number
	name: string
	email: string
	unitType: string
	website: string
	status: UnitStatus | null
	city: {
		name: string
	}
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
		},
		take: 25
	})

	return (
		<div className='flex min-h-screen flex-col items-center wrapper pt-12'>
			<H1 className='mb-24'>Units panel</H1>

			<section className='w-full mb-12'>
				<FormContextProvider>
					<DataTable columns={columns} data={units} />

					<EditUnitForm />
					<AddUnitForm />
				</FormContextProvider>
			</section>
		</div>
	)
}
