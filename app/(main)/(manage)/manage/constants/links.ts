import { GraduationCap, LucideIcon, Receipt, School2, Trash2 } from 'lucide-react'

export const links: {
	title: string
	Icon: LucideIcon
	href: string
}[] = [
	{
		title: 'Jednostka',
		Icon: School2,
		href: '/manage/unit'
	},
	{
		title: 'Kierunki',
		Icon: GraduationCap,
		href: '/manage/majors'
	},
	{
		title: 'Subskrypcje',
		Icon: Receipt,
		href: '/manage/subscriptions'
	},
	{
		title: 'Kosz',
		Icon: Trash2,
		href: '/manage/trash'
	}
]
