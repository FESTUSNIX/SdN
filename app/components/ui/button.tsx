import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'

const buttonVariants = cva(
	'inline-flex items-center justify-center rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background',
	{
		variants: {
			variant: {
				default: 'bg-primary text-primary-foreground hover:bg-primary/90',
				destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
				outline: 'border border-input hover:bg-accent hover:text-accent-foreground',
				secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
				ghost: 'hover:bg-accent hover:text-accent-foreground',
				link: 'underline-offset-4 hover:underline text-primary'
			},
			size: {
				default: 'py-3 px-4',
				sm: 'h-9 px-3 rounded-full',
				lg: 'h-11 px-8 rounded-full',
				icon: 'h-10 w-10 rounded-full',
				iconSm: 'h-8 w-8 rounded-full'
			}
		},
		defaultVariants: {
			variant: 'default',
			size: 'default'
		}
	}
)

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean
	isLoading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ isLoading, className, variant, size, asChild = false, children, ...props }, ref) => {
		return asChild ? (
			<Slot className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props}>
				{children}
			</Slot>
		) : (
			<button className={cn(buttonVariants({ variant, size, className }))} ref={ref} disabled={isLoading} {...props}>
				{isLoading ? <Loader2 className='mr-2 h-4 w-4 animate-spin' /> : null}
				{children}
			</button>
		)
	}
)
Button.displayName = 'Button'

export { Button, buttonVariants }
