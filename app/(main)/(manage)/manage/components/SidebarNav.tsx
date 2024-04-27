'use client'

import { cn } from '@/lib/utils/utils'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'
import { useCallback } from 'react'
import { links } from '../constants/links'

const SidebarNav = () => {
	const segment = useSelectedLayoutSegment()

	const isSelected = useCallback((href: string) => href.includes(String(segment)), [segment])

	return (
		<nav>
			<ul className='flex flex-col gap-2'>
				{links.map(link => (
					<li key={link.href}>
						<Link
							href={link.href}
							className={cn(
								'relative flex items-center gap-2 rounded-md px-2 py-1.5 text-muted-foreground duration-300 hover:text-secondary-foreground',
								isSelected(link.href) && 'font-medium text-secondary-foreground'
							)}>
							<link.Icon className='h-3.5 w-3.5' />
							<span className=''>{link.title}</span>
							{isSelected(link.href) ? (
								<motion.div
									className='absolute inset-0 -z-10 rounded-md bg-secondary'
									aria-hidden
									layoutId='highlight'
								/>
							) : null}
						</Link>
					</li>
				))}
			</ul>
		</nav>
	)
}

export default SidebarNav
