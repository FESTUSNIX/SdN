import React from 'react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/app/components/ui/Tooltip'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/app/components/ui/Button'

type Props = {
	href: string
	children: React.ReactNode
	tooltipText: string
}

const NavLink = ({ children, tooltipText, href }: Props) => {
	return (
		<TooltipProvider>
			<Tooltip delayDuration={50}>
				<TooltipTrigger asChild>
					<Link
						href={href}
						className={cn(
							'group',
							buttonVariants({
								variant: 'ghost',
								size: 'icon'
							})
						)}
						aria-label={tooltipText}>
						{children}
					</Link>
				</TooltipTrigger>
				<TooltipContent side='right' align='center'>
					<p>{tooltipText}</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	)
}

export default NavLink
