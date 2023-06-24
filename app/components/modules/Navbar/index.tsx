import React from 'react'
import Link from 'next/link'
import { Loader2 } from 'lucide-react'
import { links } from './constants/links'
import { Button } from '@/app/components/ui/Button'

const Navbar = () => {
	return (
		<nav className='bg-background px-12 py-4 border-b border-border sticky top-0 left-0 w-full z-50'>
			<div className='wrapper flex items-center justify-between'>
				<div className='text-xl font-black text-accent-foreground'>
					<Link href={'/'}>SdN</Link>
				</div>

				<ul className='flex gap-8 items-center'>
					{links.map(link => (
						<li key={link.path} className='py-2 text-foreground hover:text-foreground/70 cursor-pointer duration-300'>
							<Link href={link.path}>{link.label}</Link>
						</li>
					))}

					<li>
						<Button asChild>
							<Link href={'/search'}>Find your major</Link>
						</Button>
					</li>
				</ul>
			</div>
		</nav>
	)
}

export default Navbar
