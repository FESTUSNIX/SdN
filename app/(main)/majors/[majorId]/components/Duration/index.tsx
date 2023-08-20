'use client'

import { Calendar } from '@/app/components/ui/Calendar'
import useResponsive from '@/app/hooks/useResponsive'
import { Major } from '@prisma/client'
import { pl } from 'date-fns/locale'

type Props = Pick<Major, 'startDate' | 'endDate'>

export const Duration = ({ endDate, startDate }: Props) => {
	const { isLG } = useResponsive()

	return (
		<Calendar
			fromYear={2023}
			initialFocus
			mode='range'
			defaultMonth={startDate || undefined}
			selected={{ from: startDate || undefined, to: endDate || undefined }}
			showOutsideDays={false}
			disabled
			numberOfMonths={isLG ? 2 : 1}
			weekStartsOn={1}
			locale={pl}
			classNames={{
				caption_label: 'first-letter:uppercase font-medium',
				months: 'flex flex-row space-y-4 sm:space-x-4 sm:space-y-0'
			}}
		/>
	)
}
