import { cn } from '@/lib/utils/utils'

type Props = {
	children: React.ReactNode
	className?: string
	size?: 'base' | 'sm'
}

export function H1({ children, className, size = 'base' }: Props) {
	return (
		<h1
			className={cn(
				'scroll-m-20 tracking-tight',
				size === 'base' && 'text-4xl font-extrabold lg:text-5xl',
				size === 'sm' && 'text-3xl font-semibold lg:text-4xl',
				className
			)}>
			{children}
		</h1>
	)
}
