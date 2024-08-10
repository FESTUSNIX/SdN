import { cn } from '@/lib/utils'
import { DaysOfWeek, Major } from '@prisma/client'

type Props = Pick<Major, 'daysOfWeek'>

const ActiveDays = ({ daysOfWeek }: Props) => {
	return (
		<ul className='flex items-center gap-1 rounded-md border p-1'>
			{(
				[
					{ label: 'Poniedziałek', value: 'MONDAY' },
					{ label: 'Wtorek', value: 'TUESDAY' },
					{ label: 'Środa', value: 'WEDNESDAY' },
					{ label: 'Czwartek', value: 'THURSDAY' },
					{ label: 'Piątek', value: 'FRIDAY' },
					{ label: 'Sobota', value: 'SATURDAY' },
					{ label: 'Niedziela', value: 'SUNDAY' }
				] as {
					label: string
					value: DaysOfWeek
				}[]
			).map(day => (
				<li
					key={day.value}
					className={cn(
						'flex flex-grow items-center justify-center rounded-md py-2 text-sm',
						daysOfWeek.includes(day.value) && 'bg-primary text-primary-foreground'
					)}
					aria-hidden={!daysOfWeek.includes(day.value)}>
					<span className='sr-only'>{day.label}</span>
					<span aria-hidden>{day.label.slice(0, 3)}</span>
				</li>
			))}
		</ul>
	)
}

export default ActiveDays
