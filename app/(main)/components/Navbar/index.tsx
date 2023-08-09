import Link from 'next/link'
import { links } from './constants/links'
import { DynamicBorder } from './components/DynamicBorder'
import { MobileMenu } from './components/MobileMenu'

const Navbar = () => {
	return (
		<nav className='fixed left-0 top-0 z-50 w-full bg-background py-4'>
			<DynamicBorder />

			<div className='wrapper flex items-center justify-between'>
				<div className='z-50 text-2xl font-bold text-accent-foreground'>
					<Link href={'/'}>SdN</Link>
				</div>

				<MobileMenu />

				<ul className='hidden items-center gap-8 md:flex'>
					{links.map(link => (
						<li key={link.path} className='cursor-pointer py-2 text-foreground duration-300 hover:text-foreground/70'>
							<Link href={link.path}>{link.label}</Link>
						</li>
					))}
				</ul>
			</div>
		</nav>
	)
}

export default Navbar
