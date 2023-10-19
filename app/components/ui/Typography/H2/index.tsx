import { cn } from '@/lib/utils/utils'

type Props = {
	children: React.ReactNode
	className?: string
	size?: 'base' | 'sm'
}
export function H2({ children, className, size = 'sm' }: Props) {
	return (
		<h2
			className={cn(
				'scroll-m-20 pb-2 tracking-tight transition-colors first:mt-0',
				size === 'base' && 'text-3xl font-semibold',
				size === 'sm' && 'text-2xl font-medium',
				className
			)}>
			{children}
		</h2>
	)
}
