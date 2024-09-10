import { GraduationCap, LayoutDashboard, MapPinHouse, Receipt, School2, ScrollText, Users } from 'lucide-react'
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
		link: '/admin/qualifications'
	},
	{
		title: 'Cities',
		icon: MapPinHouse,
		link: '/admin/cities',
		separate: true
	},
	{
		title: 'Accounts',
		icon: Users,
		link: '/admin/accounts',
		separate: true
	},
	{
		title: 'Subscriptions',
		icon: Receipt,
		link: '/admin/subscriptions'
	}
]
