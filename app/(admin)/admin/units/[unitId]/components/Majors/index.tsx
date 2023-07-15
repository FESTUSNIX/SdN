import { DataTable } from '@/app/components/DataTable'
import { MajorPayloadWithFullQualifications } from '@/lib/validators/major'
import prisma from '@/prisma/client'
import { completionStatus } from '../../../constants/tableData'
import { columns } from './components/MajorsTable/Columns'
import RowActions from './components/MajorsTable/RowActions'

type Props = {
	unitId: number
	searchParams: {
		[key: string]: string | string[] | undefined
	}
}

const Majors = async ({ unitId, searchParams }: Props) => {
	const { page, per_page, sort, name, qualifications, status } = searchParams

	const limit = typeof per_page === 'string' ? parseInt(per_page) : 25

	const offset = typeof page === 'string' ? (parseInt(page) > 0 ? (parseInt(page) - 1) * limit : 0) : 0

	const [column, order] =
		typeof sort === 'string'
			? (sort.split('.') as [keyof MajorPayloadWithFullQualifications | undefined, 'asc' | 'desc' | undefined])
			: []

	const qualificationsArr = typeof qualifications === 'string' && (qualifications.split('.') as string[]).map(Number)

	const statuses = typeof status === 'string' && (status.split('.') as MajorPayloadWithFullQualifications['status'][])

	const [majors, totalUnits] = await prisma.$transaction([
		prisma.major.findMany({
			skip: offset,
			take: limit,
			orderBy: column ? { [column]: order ?? 'asc' } : { name: 'asc' },
			where: {
				unitId,
				name: {
					contains: typeof name === 'string' ? name : undefined,
					mode: 'insensitive'
				},
				qualifications: {
					some: {
						id: {
							in: qualificationsArr || undefined
						}
					}
				},
				status: {
					in: statuses || undefined
				}
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
		}),
		prisma.major.count({
			where: {
				unitId,
				name: {
					contains: typeof name === 'string' ? name : undefined,
					mode: 'insensitive'
				},
				qualifications: {
					some: {
						id: {
							in: qualificationsArr || undefined
						}
					}
				},
				status: {
					in: statuses || undefined
				}
			}
		})
	])

	const pageCount = Math.ceil(totalUnits / limit)

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
		<DataTable
			columns={columns}
			data={majors}
			pageCount={pageCount}
			filterableColumns={[
				{
					id: 'qualifications',
					title: 'Qualifications',
					options: qualificationsOptionsFormated
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
			buttonText='Add Major'
			sheetType='ADD_MAJOR'
		/>
	)
}

export default Majors
