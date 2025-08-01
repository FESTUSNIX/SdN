'use client'

import { buttonVariants } from '@/app/components/ui/button'
import { cn } from '@/lib/utils'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import * as React from 'react'
import { DayPicker } from 'react-day-picker'

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
	return (
		<DayPicker
			showOutsideDays={showOutsideDays}
			className={cn('p-3', className)}
			classNames={{
				months: 'flex flex-row space-y-4 sm:space-x-4 sm:space-y-0 relative',
				month: 'space-y-4',
				month_caption: 'flex justify-center pt-1 relative items-center',
				caption_label: 'text-sm font-medium first-letter:uppercase',
				nav: 'space-x-1 flex items-center',
				button_previous: cn(
					buttonVariants({ variant: 'outline' }),
					'h-7 w-7 bg-transparent p-0 z-10 opacity-50 hover:opacity-100 absolute top-0 left-1'
				),
				button_next: cn(
					buttonVariants({ variant: 'outline' }),
					'h-7 w-7 bg-transparent p-0 z-10 opacity-50 hover:opacity-100 absolute top-0 right-1'
				),
				month_grid: 'w-full border-collapse space-y-1',
				weekdays: 'flex',
				weekday: 'text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]',
				week: 'flex w-full mt-2',
				day: 'text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20',
				day_button: cn(buttonVariants({ variant: 'ghost' }), 'h-9 w-9 p-0 font-normal aria-selected:opacity-100'),
				selected:
					'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground',
				today: 'bg-accent text-accent-foreground',
				outside: 'text-muted-foreground opacity-50',
				disabled: 'text-muted-foreground opacity-50',
				range_middle: 'aria-selected:bg-accent aria-selected:text-accent-foreground',
				hidden: 'invisible',
				...classNames
			}}
			components={{
				Chevron: props => {
					if (props.orientation === 'left') {
						return <ChevronLeft className='h-4 w-4' />
					}
					return <ChevronRight className='h-4 w-4' />
				}
			}}
			{...props}
		/>
	)
}
Calendar.displayName = 'Calendar'

export { Calendar }
