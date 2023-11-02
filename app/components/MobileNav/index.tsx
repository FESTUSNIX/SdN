import { getAuthSession } from '@/lib/auth/auth'
import { cn } from '@/lib/utils/utils'
import { GraduationCap, LucideProps, School2, UserCircle2 } from 'lucide-react'
import { ReactElement } from 'react'
import { MobileNavLink } from './components/MobileNavLink'
import { MobileNavShell } from './components/MobileNavShell'

export const MobileNav = async () => {
	const session = await getAuthSession()

	const links: {
		label: string
		href: string
		Icon: ReactElement<LucideProps>
	}[] = [
		{
			label: 'Kierunki',
			href: '/search',
			Icon: <GraduationCap />
		},
		{
			label: 'Uczelnie',
			href: '/units',
			Icon: <School2 />
		},
		{
			label: session?.user ? 'Konto' : 'Zaloguj się',
			href: session?.user ? '/manage' : '/login',
			Icon: <UserCircle2 />
		}
	]

	return (
		<MobileNavShell>
			<nav className={cn('block w-full border-t bg-background py-4 md:hidden')}>
				<ul className='wrapper flex items-center justify-around'>
					{links.map(link => (
						<li key={link.href}>
							<MobileNavLink {...link} />
						</li>
					))}
				</ul>
			</nav>
		</MobileNavShell>
	)
}
