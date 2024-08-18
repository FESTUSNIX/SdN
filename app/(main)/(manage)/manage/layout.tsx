import { Separator } from '@/app/components/ui/separator'
import { getAuthSession } from '@/lib/auth/auth'
import prisma from '@/prisma/client'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import SidebarNav from './components/SidebarNav'

export const metadata: Metadata = {
	title: 'Zarządzaj uczelnią'
}

export default async function ManageLayout({ children }: { children: React.ReactNode }) {
	const session = await getAuthSession()
	if (!session) redirect('/login')

	// Check if users unit has an active subscription
	const user = await prisma.user.findFirst({
		where: {
			id: session.user.id
		},
		select: {
			unit: {
				select: {
					subscriptions: {
						where: {
							to: {
								gte: new Date()
							},
							type: { in: ['PREMIUM', 'STANDARD'] }
						}
					}
				}
			}
		}
	})

	const subscriptions = user?.unit?.subscriptions

	if (!subscriptions || subscriptions.length === 0) return redirect('/subscribe')

	return (
		<>
			<Separator />

			<div className='container flex-1 items-start max-sm:px-4 md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10'>
				<aside className='h-full md:border-r md:px-4'>
					<div className='py-8 md:sticky md:bottom-0 md:top-navOffset'>
						<SidebarNav />
					</div>
				</aside>
				<main className='flex w-full flex-col overflow-hidden pt-8'>{children}</main>
			</div>
		</>
	)
}
