import { cn } from '@/lib/utils/utils'

type Props = {
	children: React.ReactNode
	className?: string
}
export function H4({ children, className }: Props) {
	return <h4 className={cn('scroll-m-20 text-xl font-semibold tracking-tight', className)}>{children}</h4>
}