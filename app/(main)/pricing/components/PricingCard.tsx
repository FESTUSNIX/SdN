import { Badge } from '@/app/components/ui/badge'
import { buttonVariants } from '@/app/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card'
import { Separator } from '@/app/components/ui/separator'
import { H3 } from '@/app/components/ui/Typography'
import { cn } from '@/lib/utils'
import { CircleCheck } from 'lucide-react'
import Link from 'next/link'

type Props = {
	name: string
	description: string
	price: number
	button: {
		label: string
		href: string
	}
	features: string[]
	featuresLabel: string | JSX.Element
	primary?: boolean
}

export const PricingCard = ({ features, name, price, description, primary, featuresLabel, button }: Props) => {
	return (
		<Card
			className={cn(
				'rounded-3xl sm:max-md:last:col-span-2',
				primary && 'border-primary shadow-lg lg:scale-105 lg:shadow-xl xl:scale-110'
			)}>
			<CardHeader className='space-y-6'>
				<div className='flex flex-wrap-reverse items-center justify-between gap-x-6 gap-y-2'>
					<CardTitle>{name}</CardTitle>
					{primary && <Badge variant={'default'}>Popularny</Badge>}
				</div>

				<p>
					<span className='text-5xl font-bold md:text-5xl'>{price}zł</span>
					<span className='text-lg font-semibold text-muted-foreground md:text-xl'>/miesiąc</span>
				</p>

				<CardDescription className='text-pretty text-muted-foreground'>{description}</CardDescription>

				<div className='pb-2'>
					<Link
						href={button.href}
						className={cn(buttonVariants({ variant: primary ? 'default' : 'secondary' }), 'w-full')}>
						{button.label}
					</Link>
				</div>

				<Separator />
			</CardHeader>

			<CardContent className=''>
				<H3 className='mb-4 font-normal'>{featuresLabel}</H3>

				<ul className='flex flex-col gap-1.5'>
					{features.map(feature => (
						<li key={feature} className='flex items-center gap-2'>
							<CircleCheck className={cn('size-4 shrink-0 text-primary')} />
							<span className={cn('text-sm leading-tight text-muted-foreground')}>{feature}</span>
						</li>
					))}
				</ul>
			</CardContent>
		</Card>
	)
}
