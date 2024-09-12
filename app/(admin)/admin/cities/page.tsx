import { ClientSideDataTable } from '@/app/components/DataTable'
import prisma from '@/prisma/client'
import { Metadata } from 'next'
import { columns } from './components/Table/Columns'
import RowActions from './components/Table/RowActions'

type Props = {}

export const metadata: Metadata = {
	title: 'Manage cities'
}

const CitiesPage = async (props: Props) => {
	const cities = await prisma.city.findMany({
		select: {
			id: true,
			name: true,
			voivodeship: {
				select: {
					id: true,
					name: true
				}
			},
			description: true,
			image: true
		}
	})

	return (
		<main className='flex w-full flex-col items-center md:h-screen'>
			<ClientSideDataTable
				columns={columns}
				data={cities.reverse()}
				searchableColumns={[
					{
						id: 'name',
						title: 'Name'
					}
				]}
				RowActions={RowActions}
				buttonText='Add city'
				sheetType='ADD_CITY'
			/>
		</main>
	)
}

export default CitiesPage
