import { H3, Muted } from '@/app/components/ui/Typography'
import { Subscription } from '@prisma/client'
import { format } from 'date-fns'

type Props = {
	subscription: Pick<Subscription, 'slug' | 'from' | 'to' | 'type'>
}

export const SubscriptionCard = ({ subscription }: Props) => {
	return (
		<div className='flex flex-col gap-8 rounded-lg border bg-card px-4 py-2.5 text-card-foreground shadow-sm sm:flex-row sm:items-center sm:justify-between'>
			<div className='space-y-1'>
				<Muted className='text-xs'>#{subscription.slug}</Muted>
				<H3 className='mb-1 text-sm font-bold leading-none'>Subsckrybcja {subscription.type}</H3>
			</div>

			<div className='flex gap-4 sm:flex-col sm:gap-0'>
				<p className='text-sm'>
					<span className='text-muted-foreground'>Od: </span>
					<span>{format(subscription.from, 'dd/MM/yyyy')}</span>
				</p>
				<p className='text-sm'>
					<span className='text-muted-foreground'>Do: </span>
					<span>{subscription.to ? format(subscription.to, 'dd/MM/yyyy') : 'brak'}</span>
				</p>
			</div>
		</div>
	)
}
