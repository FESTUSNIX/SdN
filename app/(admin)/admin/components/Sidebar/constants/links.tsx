import { GraduationCap, LayoutDashboard, School2, ScrollText, Users } from 'lucide-react'
import { ElementType } from 'react'

export const links: {
	title: string
	icon: ElementType
	link: string
	separate?: boolean
}[] = [
	{
		title: 'Dashboard',
		icon: LayoutDashboard,
		link: '/admin',
		separate: true
	},
	{
		title: 'Units',
		icon: School2,
		link: '/admin/units'
	},
	{
		title: 'Majors',
		icon: GraduationCap,
		link: '/admin/majors'
	},
	{
		title: 'Qualifications',
		icon: ScrollText,
		link: '/admin/qualifications',
		separate: true
	},
	{
		title: 'Accounts',
		icon: Users,
		link: '/admin/accounts'
	}
]
