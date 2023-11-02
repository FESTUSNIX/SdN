import { BrandLogo } from '@/app/components/BrandLogo'
import Link from 'next/link'
import { DynamicBorder } from './components/DynamicBorder'
import { MobileMenu } from './components/MobileMenu'
import { links } from './constants/links'

const Navbar = () => {
	return (
		<header className='fixed left-0 top-0 z-50 w-full bg-background py-4'>
			<DynamicBorder />

			<div className='wrapper flex items-center justify-between'>
				<Link href={'/'} className='z-50 text-2xl font-bold text-accent-foreground'>
					<BrandLogo type='banner' />
				</Link>

				<MobileMenu />

				<nav className='hidden md:block'>
					<ul className='flex items-center gap-8'>
						{links.map(link => (
							<li key={link.path} className='cursor-pointer py-2 text-foreground duration-300 hover:text-foreground/70'>
								<Link href={link.path}>{link.label}</Link>
							</li>
						))}
					</ul>
				</nav>
			</div>
		</header>
	)
}

export default Navbar
