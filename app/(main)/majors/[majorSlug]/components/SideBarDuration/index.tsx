'use client'

import { Button } from '@/app/components/ui/Button'
import { Calendar } from '@/app/components/ui/Calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/app/components/ui/Popover'
import { cn } from '@/lib/utils'
import { Major } from '@prisma/client'
import { format } from 'date-fns'
import { pl } from 'date-fns/locale'
import { CalendarIcon } from 'lucide-react'
import { useMemo } from 'react'

type Props = Pick<Major, 'startDate' | 'endDate'>

const SideBarDuration = ({ startDate, endDate }: Props) => {
	const date = useMemo(
		() => ({
			from: startDate || undefined,
			to: endDate || undefined
		}),
		[startDate, endDate]
	)

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					id='date'
					variant={'outline'}
					className={cn(
						'w-full max-w-full justify-start text-left font-normal lg:w-[300px]',
						!date && 'text-muted-foreground'
					)}>
					<CalendarIcon className='mr-2 h-4 w-4' />
					{date?.from ? (
						date.to ? (
							<>
								{format(date.from, 'LLL dd, y', { locale: pl })} - {format(date.to, 'LLL dd, y', { locale: pl })}
							</>
						) : (
							format(date.from, 'LLL dd, y', { locale: pl })
						)
					) : (
						'Brak danych'
					)}
				</Button>
			</PopoverTrigger>
			<PopoverContent className='!z-40 w-auto p-0' align='end'>
				<Calendar
					fromYear={2023}
					initialFocus
					mode='range'
					defaultMonth={date?.from}
					selected={date}
					showOutsideDays={false}
					disabled
					numberOfMonths={2}
					weekStartsOn={1}
					locale={pl}
				/>
			</PopoverContent>
		</Popover>
	)
}

export default SideBarDuration
