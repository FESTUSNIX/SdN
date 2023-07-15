import prisma from '@/prisma/client'
import { Metadata } from 'next'
import { columns } from './components/QualificationsTable/Columns'
import { QualificationsTable } from './components/QualificationsTable/QualificationsTable'
import { Qualification } from '@prisma/client'
import { qualificationTypeOptions } from './constants/qualificationTypeOptions'
import { DataTable } from '@/app/components/DataTable'
import RowActions from './components/QualificationsTable/RowActions'

export const metadata: Metadata = {
	title: 'Manage qualifications | SdN',
	description: 'Admin panel - qualifications'
}

type Props = {
	searchParams: {
		[key: string]: string | string[] | undefined
	}
}

export default async function QualificationsPage({ searchParams }: Props) {
	const { page, per_page, sort, name, type } = searchParams

	const limit = typeof per_page === 'string' ? parseInt(per_page) : 25

	const offset = typeof page === 'string' ? (parseInt(page) > 0 ? (parseInt(page) - 1) * limit : 0) : 0

	const [column, order] =
		typeof sort === 'string' ? (sort.split('.') as [keyof Qualification | undefined, 'asc' | 'desc' | undefined]) : []

	const types = typeof type === 'string' && (type.split('.') as Qualification['type'][])

	const [qualifications, totalQualifications] = await prisma.$transaction([
		prisma.qualification.findMany({
			skip: offset,
			take: limit,
			where: {
				name: {
					contains: typeof name === 'string' ? name : undefined
				},
				type: {
					in: types || undefined
				}
			},
			orderBy: column ? { [column]: order ?? 'asc' } : { name: 'asc' }
		}),
		prisma.qualification.count({
			where: {
				name: {
					contains: typeof name === 'string' ? name : undefined
				},
				type: {
					in: types || undefined
				}
			}
		})
	])

	const pageCount = Math.ceil(totalQualifications / limit)

	return (
		<div className='flex flex-col items-center md:h-screen'>
			<DataTable
				columns={columns}
				data={qualifications}
				pageCount={pageCount}
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
