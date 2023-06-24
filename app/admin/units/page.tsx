import { H1 } from '@/app/components/ui/Typography'
import prisma from '@/prisma/client'
import UnitForm from '../components/modules/UnitForm'
import { columns } from './components/Columns'
import { DataTable } from './components/DataTable'
import { UnitStatus } from '@prisma/client'

export type TableUnitData = {
	id: number
	name: string
	email: string
	isPublic: boolean
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
			isPublic: true,
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

			<section className='w-full flex justify-end mb-8'>
				<UnitForm />
			</section>

			<section className='w-full mb-12'>
				<DataTable columns={columns} data={units} />
			</section>
		</div>
	)
}
