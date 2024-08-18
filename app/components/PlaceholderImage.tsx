import { cn } from '@/lib/utils'
import { ImageIcon } from 'lucide-react'

type Props = {
	className?: string
	label?: string
	iconClassName?: string
	as?: 'div' | 'span' | 'li'
	animated?: boolean
}

export const PlaceholderImage = ({ className, iconClassName, label, as = 'div', animated = true }: Props) => {
	const Component = as

	return (
		<Component
			className={cn(
				'group/placeholderImage flex aspect-square size-full items-center justify-center overflow-hidden rounded-md border bg-muted',
				animated && 'duration-300 hover:border-muted-foreground/50',
				className
			)}>
			<ImageIcon
				className={cn(
					'size-6 text-muted-foreground',
					animated && 'duration-300 group-hover/placeholderImage:scale-100',
					iconClassName
				)}
			/>
			{label && <span className='sr-only'>{label}</span>}
		</Component>
	)
}
