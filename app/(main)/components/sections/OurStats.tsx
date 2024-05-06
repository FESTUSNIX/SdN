import React from 'react'

type Props = {}

const STATS = [
	{
		value: '194',
		label: 'Uczelni w całej Polsce'
	},
	{
		value: '2600 +',
		label: 'Unikatowych kierunków'
	},
	{
		value: '90 +',
		label: 'Oferowanych kwalifikacji'
	}
]

export const OurStats = (props: Props) => {
	return (
		<section className='z-10 flex w-full items-center justify-center bg-[#EEF1F6] py-8'>
			<h2 className='sr-only'>nasze zalety</h2>
			<ul className='wrapper flex w-full items-center justify-between rounded-3xl bg-background px-12 py-6'>
				{STATS.map(stat => (
					<li key={stat.label}>
						<h3 className='flex items-center gap-6'>
							<span className='font-heading text-5xl font-semibold'>{stat.value}</span>
							<span className='max-w-32 text-muted-foreground'>{stat.label}</span>
						</h3>
					</li>
				))}
			</ul>
		</section>
	)
}
