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
		<section className='z-10 flex w-full items-center justify-center bg-secondary py-8'>
			<h2 className='sr-only'>nasze zalety</h2>

			<ul className='wrapper flex w-full flex-row flex-wrap items-center justify-center gap-12 rounded-3xl bg-background px-8 py-6 md:justify-between 2xl:px-12'>
				{STATS.map(stat => (
					<li key={stat.label}>
						<h3 className='flex flex-col items-center gap-2 text-center leading-none xl:flex-row xl:gap-6 xl:text-start'>
							<span className='font-heading text-[2.5rem] font-semibold lg:text-5xl'>{stat.value}</span>
							<span className='max-w-64 text-muted-foreground xl:max-w-32'>{stat.label}</span>
						</h3>
					</li>
				))}
			</ul>
		</section>
	)
}
