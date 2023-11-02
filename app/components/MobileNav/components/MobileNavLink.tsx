'use client'

import { cn } from '@/lib/utils/utils'
import { LucideProps } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { ReactElement } from 'react'

type Props = {
	label: string
	href: string
	Icon: ReactElement<LucideProps>
}

export const MobileNavLink = ({ Icon, href, label }: Props) => {
	const path = usePathname()

	const isActive = (href: string) => path.startsWith('/' + href.split('/').filter(s => s)[0])

	const clonedIcon = React.cloneElement(Icon, {
		className: 'mb-1 h-6 w-6'
	})

	return (
		<Link
			href={href}
			className={cn(
				'flex flex-col items-center px-2 text-muted-foreground hover:text-primary',
				isActive(href) && 'text-primary'
			)}>
			{clonedIcon}
			<span className='text-xs'>{label}</span>
		</Link>
	)
}
