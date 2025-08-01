import ThemeSwitch from '@/app/(admin)/admin/components/ThemeSwitch'
import IconBadge from '@/app/components/IconBadge'
import { Muted } from '@/app/components/ui/Typography'
import { cn } from '@/lib/utils'
import { Facebook, Instagram, Mail, Phone } from 'lucide-react'
import Link from 'next/link'
import { Icons } from '../Icons'
import { links as linkGroups } from './constants/links'
import { siteConfig } from '@/config/site'

const Footer = () => {
	const date = new Date()
	const year = date.getFullYear()

	return (
		<footer className='mt-12 border-t pt-12'>
			<div className='wrapper'>
				<div className='flex flex-wrap gap-x-16 gap-y-16'>
					<div className='mr-auto flex flex-col gap-8'>
						<div>
							<Icons.brand.wordmark className='h-12 w-auto text-primary' />
						</div>

						<Muted className='max-w-md [text-wrap:pretty;]'>
							Pomagamy nauczycielom znaleźć idealne studia, rozwijać karierę i odkrywać nowe możliwości edukacyjne.
							Twoja przyszłość w edukacji zaczyna się tutaj.
						</Muted>
					</div>

					<div className='flex flex-col gap-6 md:w-full md:flex-row md:gap-16 lg:w-auto'>
						{linkGroups.map(group => (
							<div key={group.title}>
								<h5 className='mb-4 text-sm font-semibold'>{group.title}</h5>
								<ul className='flex flex-row flex-wrap gap-x-4 gap-y-1 md:flex-col md:gap-2'>
									{group.links.map((link, i) => (
										<li key={`${link.link}-${i}`}>
											<Link
												href={link.link}
												target={link.external ? '_blank' : undefined}
												className={cn('w-max text-muted-foreground hover:underline')}>
												<Muted>{link.label}</Muted>
											</Link>
										</li>
									))}
								</ul>
							</div>
						))}
					</div>
				</div>

				<div className='mt-12 flex flex-col-reverse items-center justify-between gap-y-6 border-t py-6 lg:flex-row'>
					<div>
						<p className='text-center text-sm text-muted-foreground md:w-max'>
							Copyright &copy; {year ?? 2024} Studia dla Nauczycieli. Wszelkie Prawa Zastrzeżone.
						</p>
					</div>
					<div className='flex flex-wrap items-center justify-center gap-4'>
						<ThemeSwitch />
						<IconBadge href={siteConfig.links.facebook} name='Facebook' Icon={Facebook} />
						<IconBadge href={siteConfig.links.instagram} name='Instagram' Icon={Instagram} />
					</div>
				</div>
			</div>
		</footer>
	)
}

export default Footer
