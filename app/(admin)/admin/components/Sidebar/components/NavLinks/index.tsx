'use client'

import { Separator } from '@/app/components/ui/Separator/separator'
import { GraduationCap, LayoutDashboard, School2, ScrollText } from 'lucide-react'
import NavLink from '../NavLink'

export const NavLinks = () => {
	return (
		<div className='mt-12 flex flex-col gap-y-2'>
			<NavLink tooltipText='Dashboard' href='/admin'>
				<LayoutDashboard className='h-5 w-5 text-muted-foreground duration-300 group-hover:text-neutral-200' />
			</NavLink>
			<Separator />
			<NavLink tooltipText='Units' href='/admin/units'>
				<School2 className='h-5 w-5 text-muted-foreground duration-300 group-hover:text-neutral-200' />
			</NavLink>
			<NavLink tooltipText='Majors' href='/admin/majors'>
				<GraduationCap className='h-5 w-5 text-muted-foreground duration-300 group-hover:text-neutral-200' />
			</NavLink>
			<NavLink tooltipText='Qualifications' href='/admin/qualifications'>
				<ScrollText className='h-5 w-5 text-muted-foreground duration-300 group-hover:text-neutral-200' />
			</NavLink>
		</div>
	)
}

export default NavLinks
