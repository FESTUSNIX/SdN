'use client'

import React from 'react'
import { links } from '../constants/links'
import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'
import { cn } from '@/lib/utils/utils'

const SidebarNav = () => {
	const segment = useSelectedLayoutSegment()

	return (
		<nav>
			<ul className='flex flex-col gap-2'>
				{links.map(link => (
					<li key={link.href}>
						<Link
							href={link.href}
							className={cn(
								'flex items-center gap-2 rounded-md px-2 py-1.5 text-muted-foreground duration-300 hover:bg-secondary hover:text-secondary-foreground',
								link.href.includes(String(segment)) && 'bg-secondary font-medium text-secondary-foreground'
							)}>
							<link.Icon className='h-3.5 w-3.5' />
							<span className=''>{link.title}</span>
						</Link>
					</li>
				))}
			</ul>
		</nav>
	)
}

export default SidebarNav
