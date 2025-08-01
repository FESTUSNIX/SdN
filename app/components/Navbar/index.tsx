import { Icons } from '@/app/components/Icons'
import Link from 'next/link'
import { Suspense } from 'react'
import AccountDropdown from './components/AccountDropdown'
import { DynamicBorder } from './components/DynamicBorder'
import { SearchBar } from './components/SearchBar'
import UserAvatar from '../UserAvatar'

const Navbar = async () => {
	return (
		<header className='fixed left-0 top-0 z-50 w-full bg-background py-4'>
			<DynamicBorder />

			<div className='wrapper flex items-center justify-between'>
				<Link href={'/'} className='z-50 shrink-0 text-2xl font-bold text-accent-foreground'>
					<Icons.brand.wordmark className='hidden h-9 w-auto text-primary md:block' />
					<Icons.brand.logo className='h-8 w-auto text-primary md:hidden' />
					<span className='sr-only'>Strona główna</span>
				</Link>

				<div className='max-w-full shrink overflow-hidden pl-4'>
					<Suspense>
						<SearchBar />
					</Suspense>
				</div>

				<nav className='hidden md:block'>
					<Suspense
						fallback={
							<UserAvatar
								user={{ image: null, name: null }}
								className='cursor-pointer border duration-300 hover:shadow'
							/>
						}>
						<AccountDropdown />
					</Suspense>
				</nav>
			</div>
		</header>
	)
}

export default Navbar
