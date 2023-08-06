import Link from 'next/link'
import { links } from './constants/links'

const Navbar = () => {
	return (
		<nav className='sticky left-0 top-0 z-50 w-full bg-background px-12 py-4'>
			<div className='wrapper flex items-center justify-between'>
				<div className='text-2xl font-bold text-accent-foreground'>
					<Link href={'/'}>SdN</Link>
				</div>

				<ul className='flex items-center gap-8'>
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
