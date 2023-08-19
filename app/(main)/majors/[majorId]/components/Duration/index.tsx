'use client'

import { Calendar } from '@/app/components/ui/Calendar'
import { Major } from '@prisma/client'
import { pl } from 'date-fns/locale'

type Props = Pick<Major, 'startDate' | 'endDate'>

export const Duration = ({ endDate, startDate }: Props) => {
	return (
		<Calendar
			fromYear={2023}
			initialFocus
			mode='range'
			defaultMonth={startDate || undefined}
			selected={{ from: startDate || undefined, to: endDate || undefined }}
			showOutsideDays={false}
			disabled
			numberOfMonths={2}
			weekStartsOn={1}
			locale={pl}
			classNames={{ caption_label: 'first-letter:uppercase font-medium' }}
		/>
	)
}
