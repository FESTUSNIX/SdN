import { cn } from '@/lib/utils/utils'
import { DaysOfWeek, Major } from '@prisma/client'

type Props = Pick<Major, 'daysOfWeek'>

const ActiveDays = ({ daysOfWeek }: Props) => {
	return (
		<div className='mt-8 flex items-center gap-1 rounded-md border p-1'>
			{(
				[
					{ label: 'Pon', value: 'MONDAY' },
					{ label: 'Wto', value: 'TUESDAY' },
					{ label: 'Śro', value: 'WEDNESDAY' },
					{ label: 'Czw', value: 'THURSDAY' },
					{ label: 'Pią', value: 'FRIDAY' },
					{ label: 'Sob', value: 'SATURDAY' },
					{ label: 'Nie', value: 'SUNDAY' }
				] as {
					label: string
					value: DaysOfWeek
				}[]
			).map(day => (
				<div
					key={day.value}
					className={cn(
						'flex flex-grow items-center justify-center rounded-md py-2 text-sm',
						daysOfWeek.includes(day.value) && 'bg-primary text-primary-foreground'
					)}>
					{day.label}
				</div>
			))}
		</div>
	)
}

export default ActiveDays
