'use client'

import { Calendar } from '@/app/components/ui/calendar'
import useResponsive from '@/app/hooks/useResponsive'
import { Major } from '@prisma/client'
import { pl } from 'date-fns/locale'
import { Suspense, useEffect, useState } from 'react'

type Props = Pick<Major, 'startDate' | 'endDate'>

export const Duration = ({ endDate, startDate }: Props) => {
	const { isLG: lgBreakpoint } = useResponsive()
	const [isLG, setIsLG] = useState(false)

	useEffect(() => {
		setIsLG(lgBreakpoint)
	}, [lgBreakpoint])

	return (
		<Suspense fallback={<div>Ładowanie...</div>}>
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
				className='w-max rounded-lg border'
				classNames={{
					caption_label: 'first-letter:uppercase font-medium',
					months: 'flex flex-row space-y-4 sm:space-x-4 sm:space-y-0'
				}}
			/>
		</Suspense>
	)
}
