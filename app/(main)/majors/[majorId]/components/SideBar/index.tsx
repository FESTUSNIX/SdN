import { Card } from '@/app/components/ui/Card'
import { H3, Muted } from '@/app/components/ui/Typography'
import { Major } from '@prisma/client'
import Duration from '../SideBarDuration'
import { Separator } from '@/app/components/ui/Separator/separator'
import { majorLevelEnum } from '@/app/constants/majorLevelEnum'

type Props = { major: Major }

const SideBar = ({ major }: Props) => {
	const {
		startDate,
		endDate,
		durationInHours,
		onlineDuration,
		cost,
		canPayInInstallments,
		numberOfSemesters,
		contact,
		organisator,
		address,
		formOfStudy,
		majorLevel
	} = major

	return (
		<div className='relative min-h-full md:ml-12 lg:ml-24'>
			<aside className='sticky top-navOffset pb-8 pt-12'>
				<Card className='flex flex-col gap-4 p-4'>
					{(startDate || endDate || numberOfSemesters || durationInHours || onlineDuration) && (
						<div>
							<H3 size='sm' className='mb-1'>
								Czas trwania
							</H3>
							{startDate && endDate && <Duration startDate={startDate} endDate={endDate} />}
						</div>
					)}

					<div>
						{[
							{
								name: 'Liczba semestrów',
								value: numberOfSemesters
							},
							{
								name: 'Łącznie',
								value: durationInHours ? `${durationInHours} godzin` : null
							},
							{
								name: 'Online',
								value: onlineDuration ? `${onlineDuration} godzin` : null
							}
						].map(
							item =>
								item.value && (
									<div key={item.name} className='mb-1 flex items-center justify-between'>
										<span>{item.name}</span>
										<span className=''>{item.value}</span>
									</div>
								)
						)}
					</div>

					{(contact || organisator || address) && (
						<>
							<Separator />
							<div>
								<H3 size='sm' className='mb-1'>
									Organizowane przez
								</H3>
								{organisator && <div>{organisator}</div>}
								{contact && <div>{contact}</div>}
								{address && <div>{address}</div>}
							</div>
						</>
					)}

					{(formOfStudy || organisator) && (
						<>
							<Separator />
							<div>
								<H3 size='sm' className='mb-1'>
									Detale
								</H3>
								<div>
									{[
										{
											name: 'Tryb',
											value: formOfStudy
										},
										{
											name: 'Poziom',
											value: majorLevelEnum[majorLevel]
										}
									].map(
										item =>
											item.value && (
												<div key={item.name} className='mb-1 flex items-center justify-between'>
													<span>{item.name}</span>
													<span className=''>{item.value}</span>
												</div>
											)
									)}
								</div>
							</div>
						</>
					)}

					{cost && (
						<>
							<Separator />
							<div>
								<H3 size='sm'>Od {cost} zł</H3>
								{canPayInInstallments && <Muted>Możliwość płatności w ratach</Muted>}
							</div>
						</>
					)}
				</Card>
			</aside>
		</div>
	)
}

export default SideBar
