import { H1, H2 } from '@/app/components/ui/Typography'
import { getAuthSession } from '@/lib/auth/auth'
import prisma from '@/prisma/client'
import { DashboardChart } from './components/DashboardChart'

export default async function AdminPage() {
	const session = await getAuthSession()

	const statistics = await prisma.statistics.findMany({
		where: {
			date: {
				gte: new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000)
			}
		},
		orderBy: {
			date: 'asc'
		}
	})

	return (
		<div className='wrapper flex min-h-screen flex-1 flex-col pt-12'>
			<H1 className='mb-6'>Dashboard</H1>
			<H2 className='mb-12'>Welcome {session?.user.name ?? session?.user.email} !</H2>
			<div className=''>
				<DashboardChart statistics={statistics} />
			</div>
			<div className='h-16'></div>
		</div>
	)
}
