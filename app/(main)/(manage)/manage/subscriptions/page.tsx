import { Separator } from '@/app/components/ui/separator'
import { H1, H2, Muted } from '@/app/components/ui/Typography'
import { getAuthSession } from '@/lib/auth/auth'
import prisma from '@/prisma/client'
import { isBefore } from 'date-fns'
import { redirect } from 'next/navigation'
import { SubscriptionCard } from './components/SubscriptionCard'

export default async function ManageSubscriptionsPage() {
	const session = await getAuthSession()
	if (!session) redirect('/login')

	const subscriptions = await prisma.subscription.findMany({
		where: {
			unit: {
				managers: {
					some: {
						id: session.user.id
					}
				}
			}
		},
		orderBy: {
			from: 'asc'
		},
		select: {
			from: true,
			to: true,
			slug: true,
			type: true
		}
	})

	const activeSubscriptions = subscriptions.filter(s => {
		if (!s.to) return true
		const now = new Date()
		return isBefore(now, s.to)
	})

	const archivedSubscriptions = subscriptions.filter(s => {
		if (!s.to) return false
		const now = new Date()
		return isBefore(s.to, now)
	})

	return (
		<div className='flex h-full flex-col gap-8'>
			<section>
				<H1>Subskrybcje</H1>
				<Muted className='text-base'>Zarządzaj subskrybcjami</Muted>

				<Separator className='mt-4' />
			</section>

			<section className='space-y-2'>
				<H2>Aktualne</H2>

				{activeSubscriptions.length > 0 ? (
					activeSubscriptions.map(subscription => (
						<SubscriptionCard key={subscription.slug} subscription={subscription} />
					))
				) : (
					<Muted>Brak aktywnych subskrybcji</Muted>
				)}
			</section>

			<section className='space-y-2'>
				<H2>Zarchiwizowane</H2>

				{archivedSubscriptions.length > 0 ? (
					archivedSubscriptions.map(subscription => (
						<SubscriptionCard key={subscription.slug} subscription={subscription} />
					))
				) : (
					<Muted>Brak zarchiwizowanych subskrybcji</Muted>
				)}
			</section>
		</div>
	)
}
