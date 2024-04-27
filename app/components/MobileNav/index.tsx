import { getAuthSession } from '@/lib/auth/auth'
import { cn } from '@/lib/utils/utils'
import { Heart, LucideProps, Search, UserCircle2 } from 'lucide-react'
import { ReactElement } from 'react'
import { Icons } from '../Icons'
import { MobileNavLink } from './components/MobileNavLink'
import { MobileNavShell } from './components/MobileNavShell'

export const MobileNav = async () => {
	const session = await getAuthSession()

	const links: ({
		label: string
		href: string
		Icon: ReactElement<LucideProps>
	} | null)[] = [
		{
			label: 'Odkrywaj',
			href: '/',
			Icon: <Icons.brand.logo />
		},
		{
			label: 'Szukaj',
			href: '/search',
			Icon: <Search />
		},
		{
			label: 'Polubione',
			href: '/saved',
			Icon: <Heart />
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
					{links.map(
						link =>
							link && (
								<li key={link.href}>
									<MobileNavLink {...link} />
								</li>
							)
					)}
				</ul>
			</nav>
		</MobileNavShell>
	)
}
