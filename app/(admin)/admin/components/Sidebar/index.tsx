import { getAuthSession } from '@/lib/auth/auth'
import Link from 'next/link'
import ThemeSwitch from '../ThemeSwitch'
import NavLinks from './components/NavLinks'
import NavMenu from './components/NavMenu'
import UserAccountNav from './components/UserAccountNav'
import { BrandLogo } from '@/app/components/BrandLogo'

const Sidebar = async () => {
	const session = await getAuthSession()

	return (
		<nav className='fixed top-0 z-20 flex shrink-0 flex-row items-center border-b border-border bg-background px-4 py-4 max-md:w-full md:h-screen md:flex-col md:border-r'>
			<Link href='/' className='hidden md:block'>
				<BrandLogo className='w-fit' />
			</Link>

			<NavLinks />
			<NavMenu />

			<div className='ml-auto flex items-center gap-2 md:mt-auto md:flex-col md:gap-8'>
				<ThemeSwitch variant={'ghost'} />

				<UserAccountNav
					user={{
						email: session?.user.email,
						name: session?.user.name,
						image: session?.user.image
					}}
				/>
			</div>
		</nav>
	)
}

export default Sidebar
