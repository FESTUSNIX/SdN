import { LikeButton } from '@/app/components/Majors/LikeButton'
import { Card } from '@/app/components/ui/Card'
import { Separator } from '@/app/components/ui/Separator/separator'
import { H3, Muted } from '@/app/components/ui/Typography'
import { majorLevelEnum } from '@/app/constants/majorLevel'
import { cn } from '@/lib/utils'
import { Major } from '@prisma/client'
import Duration from '../SideBarDuration'

type Props = { major: Major; hasActiveSubscription: boolean }

const SideBar = ({ major, hasActiveSubscription }: Props) => {
	const {
		startDate,
		endDate,
		durationInHours,
		cost,
		canPayInInstallments,
		numberOfSemesters,
		contact,
		organisator,
		address,
		majorLevel,
		isRegulated,
		isOnline
	} = major

	return (
		<div className='relative min-h-full md:ml-12 lg:ml-24'>
			<aside className='sticky top-navOffset md:pb-8 md:pt-12'>
				<Card className='flex flex-col gap-4 rounded-none border-0 border-b bg-card py-8 text-card-foreground shadow-sm md:rounded-lg md:border md:p-4'>
					<div>
						<H3 size='sm' className='mb-2'>
							Czas trwania
						</H3>
						<Duration startDate={startDate} endDate={endDate} />
					</div>

					{hasActiveSubscription && (
						<div>
							{[
								{
									name: 'Liczba semestrów',
									value: numberOfSemesters
								},
								{
									name: 'Łącznie',
									value: durationInHours ? `${durationInHours} godzin` : null
								}
							].map(item => (
								<div
									key={item.name}
									className='mb-2 flex flex-row flex-wrap items-center justify-between gap-x-8 lg:mb-1'>
									<span>{item.name}</span>
									<span className={cn('text-sm', !item.value && 'text-muted-foreground')}>
										{item.value || 'Brak danych'}
									</span>
								</div>
							))}
						</div>
					)}
					{hasActiveSubscription && (contact || organisator || address) && (
						<>
							<Separator />
							<div>
								<H3 size='sm' className='mb-1'>
									Organizowane przez
								</H3>
								{organisator && <p>{organisator}</p>}
								{contact && <p>{contact}</p>}
								{address && <p>{address}</p>}
							</div>
						</>
					)}

					{majorLevel && (
						<>
							<Separator />
							<div>
								<H3 size='sm' className='mb-1'>
									Informacje
								</H3>
								<div>
									{[
										{
											name: 'Poziom',
											value: majorLevelEnum[majorLevel]
										},
										{
											name: 'Tryb',
											value: isOnline ? 'Online' : 'Stacjonarne'
										},
										{
											name: 'Regulowany',
											value: isRegulated ? 'Tak' : 'Nie'
										}
									].map(item => (
										<div
											key={item.name}
											className='mb-2 flex flex-row flex-wrap items-center justify-between gap-x-8 lg:mb-1'>
											<span>{item.name}</span>
											<span className={cn('text-sm', !item.value && 'text-muted-foreground')}>
												{item.value || 'Brak danych'}
											</span>
										</div>
									))}
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

					<LikeButton
						majorSlug={major.slug}
						label={{ liked: 'Zapisane', disliked: 'Zapisz' }}
						className='ml-auto mt-2 w-max'
					/>
				</Card>
			</aside>
		</div>
	)
}

export default SideBar
