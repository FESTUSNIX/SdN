'use client'

import { Separator } from '@/app/components/ui/Separator/separator'
import React from 'react'
import { links } from '../../constants/links'
import NavLink from '../NavLink'

export const NavLinks = () => {
	return (
		<div className='hidden flex-col gap-2 md:mt-12 md:flex'>
			{links.map((link, index) => (
				<React.Fragment key={index}>
					<NavLink tooltipText={link.title} href={link.link} >
						<link.icon className='h-5 w-5 text-muted-foreground duration-300 ' />
						<span className='sr-only'>{link.title}</span>
					</NavLink>
					{link.separate && <Separator className='hidden md:block' />}
				</React.Fragment>
			))}
		</div>
	)
}

export default NavLinks
