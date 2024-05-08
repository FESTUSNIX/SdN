import { cn } from '@/lib/utils/utils'

type Props = {
	children: React.ReactNode
	className?: string
	size?: 'base' | 'sm'
}

export function H1({ children, className, size = 'sm' }: Props) {
	return (
		<h1
			className={cn(
				'scroll-m-20 font-heading tracking-tight',
				size === 'base' && 'text-4xl font-semibold lg:text-5xl',
				size === 'sm' && 'text-3xl font-semibold',
				className
			)}>
			{children}
		</h1>
	)
}
