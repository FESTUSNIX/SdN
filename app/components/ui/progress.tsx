'use client'

import * as React from 'react'
import * as ProgressPrimitive from '@radix-ui/react-progress'

import { cn } from '@/lib/utils'

const Progress = React.forwardRef<
	React.ElementRef<typeof ProgressPrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
	<ProgressPrimitive.Root
		ref={ref}
		className={cn('relative h-4 w-full overflow-hidden rounded-full bg-secondary', className)}
		{...props}>
		<ProgressPrimitive.Indicator
			className='h-full w-full flex-1 bg-primary transition-all'
			style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
		/>
	</ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }

export const CircleProgress = React.forwardRef<
	React.ElementRef<typeof ProgressPrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
	<ProgressPrimitive.Root
		ref={ref}
		className={cn(
			`relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-primary/20`,
			className
		)}
		{...props}
		style={{
			background: `radial-gradient(closest-side, hsl(var(--background)) 79%, transparent 80% 100%), conic-gradient(hsl(var(--primary)) ${
				value || 0
			}%, hsl(var(--muted)) 0)`
		}}>
		<div className=''>{`${value || 0}%`}</div>
	</ProgressPrimitive.Root>
))
CircleProgress.displayName = ProgressPrimitive.Root.displayName
