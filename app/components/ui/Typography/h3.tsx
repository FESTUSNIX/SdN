import { cn } from '@/lib/utils'

type Props = {
	children: React.ReactNode
	className?: string
	size?: 'base' | 'sm'
}
export function H3({ children, className, size = 'sm' }: Props) {
	return (
		<h3
			className={cn(
				'scroll-m-20 tracking-tight',
				size === 'base' && 'text-xl font-semibold md:text-2xl',
				size === 'sm' && 'text-base font-semibold',
				className
			)}>
			{children}
		</h3>
	)
}
