import { cn } from '@/lib/utils/utils'
import React from 'react'

type Props = {
	size: number
	type: 'square' | 'circle' | 'triangle' | 'half-circle'
	className?: string
}

export const DecorationShape = ({ type, className, size }: Props) => {
	return (
		<div
			data-size={`${size}`}
			className={cn(
				'absolute -z-10 aspect-square bg-muted/60',
				type === 'square' && '-rotate-[22.5deg] skew-x-[25deg] rounded-lg',
				type === 'circle' && 'rounded-full',
				type === 'triangle' && 'bg-transparent fill-muted/60',
				type === 'half-circle' && 'bg-transparent stroke-muted/60',
				className
			)}
			style={{
				width: `${size}px`
			}}>
			{type === 'triangle' && (
				<svg
					width='100%'
					height='100%'
					viewBox='0 0 82 71'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
					className='fill-inherit'>
					<path
						d='M44.4641 69C42.9245 71.6667 39.0755 71.6667 37.5359 69L1.16283 6C-0.376769 3.33333 1.54773 0 4.62693 0L77.3731 0C80.4523 0 82.3768 3.33333 80.8372 6L44.4641 69Z'
						fill='inherit'
					/>
				</svg>
			)}
			{type === 'half-circle' && (
				<svg
					width='385'
					height='194'
					viewBox='0 0 385 194'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
					className='stroke-inherit'>
					<path
						d='M8 8C8 245.333 377 245.333 377 8'
						stroke='inherit'
						stroke-width='16'
						stroke-linecap='round'
						className='stroke-inherit'
					/>
				</svg>
			)}
		</div>
	)
}
