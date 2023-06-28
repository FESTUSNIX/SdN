'use client'

import { Separator } from '@/app/components/ui/Separator/separator'
import { GraduationCap, Home } from 'lucide-react'
import NavLink from '../NavLink'

export const NavLinks = () => {
	return (
		<div className='mt-12 flex flex-col gap-y-2'>
			<NavLink tooltipText='Home' href='/admin'>
				<Home className='h-5 w-5 text-muted-foreground duration-300 group-hover:text-neutral-200' />
			</NavLink>
			<Separator />
			<NavLink tooltipText='Units' href='/admin/units'>
				<GraduationCap className='h-5 w-5 text-muted-foreground duration-300 group-hover:text-neutral-200' />
			</NavLink>
		</div>
	)
}

export default NavLinks
