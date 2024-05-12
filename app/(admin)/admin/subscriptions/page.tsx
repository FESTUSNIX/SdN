import { ClientSideDataTable } from '@/app/components/DataTable'
import prisma from '@/prisma/client'
import { Metadata } from 'next'
import React from 'react'
import { columns } from './components/Table/Columns'
import RowActions from './components/Table/RowActions'

type Props = {}

export const metadata: Metadata = {
	title: 'Manage subscriptions'
}

const SubscriptionsPage = async (props: Props) => {
	const subscriptions = await prisma.subscription.findMany({
		select: {
			slug: true,
			type: true,
			from: true,
			to: true,
			unit: {
				select: {
					id: true,
					name: true,
					slug: true
				}
			}
		}
	})

	return (
		<main className='flex w-full flex-col items-center md:h-screen'>
			<ClientSideDataTable
				columns={columns}
				data={subscriptions}
				filterableColumns={[
					{
						id: 'to',
						title: 'Is active',
						options: [
							{
								value: 'active',
								label: 'Active'
							},
							{
								value: 'inactive',
								label: 'Inactive'
							}
						]
					}
				]}
				searchableColumns={[
					{
						id: 'unit',
						title: 'Unit'
					}
				]}
				RowActions={RowActions}
				buttonText='Add subscription'
				sheetType='ADD_SUBSCRIPTION'
			/>
		</main>
	)
}

export default SubscriptionsPage
