import prisma from '@/prisma/client'
import { Status, Unit } from '@prisma/client'
import { Metadata } from 'next'
import { columns } from './components/UnitsTable/Columns'
import { DataTable } from '@/app/components/DataTable'
import { completionStatus, unitTypes } from './constants/tableData'
import RowActions from './components/UnitsTable/RowActions'

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

type Props = {
	searchParams: {
		[key: string]: string | string[] | undefined
	}
}

export default async function UnitsPage({ searchParams }: Props) {
	const { page, per_page, sort, name, unitType, status } = searchParams

	const limit = typeof per_page === 'string' ? parseInt(per_page) : 25

	const offset = typeof page === 'string' ? (parseInt(page) > 0 ? (parseInt(page) - 1) * limit : 0) : 0

	const [column, order] =
		typeof sort === 'string' ? (sort.split('.') as [keyof Unit | undefined, 'asc' | 'desc' | undefined]) : []

	const types = typeof unitType === 'string' && (unitType.split('.') as Unit['unitType'][])
	const statuses = typeof status === 'string' && (status.split('.') as Unit['status'][])

	const [units, totalUnits] = await prisma.$transaction([
		prisma.unit.findMany({
			skip: offset,
			take: limit,
			orderBy: column
				? column === ('_count_majors' as any)
					? {
							majors: {
								_count: order ?? 'asc'
							}
					  }
					: column === ('city_name' as any)
					? {
							city: {
								name: order ?? 'asc'
							}
					  }
					: { [column]: order ?? 'asc' }
				: { name: 'asc' },
			where: {
				name: {
					contains: typeof name === 'string' ? name : undefined,
					mode: 'insensitive'
				},
				unitType: {
					in: types || undefined
				},
				status: {
					in: statuses || undefined
				}
			},
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
		}),
		prisma.qualification.count()
	])

	const pageCount = Math.ceil(totalUnits / limit)

	return (
		<div className='flex flex-col items-center md:h-screen'>
			<DataTable
				columns={columns}
				data={units}
				pageCount={pageCount}
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
