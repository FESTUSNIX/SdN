import { cn } from '@/lib/utils/utils'

type Props = {
	children: React.ReactNode
	className?: string
	size?: 'base' | 'sm'
}
export function H4({ children, className, size = 'sm' }: Props) {
	return (
		<h4
			className={cn(
				'scroll-m-20 font-semibold tracking-tight',
				size === 'base' && 'text-xl',
				size === 'sm' && 'text-sm',
				className
			)}>
			{children}
		</h4>
	)
}
