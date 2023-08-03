import IconBadge from '@/app/components/IconBadge'
import { Button } from '@/app/components/ui/Button'
import { Input } from '@/app/components/ui/Input'
import { Muted } from '@/app/components/ui/Typography'
import { cn } from '@/lib/utils/utils'
import { Facebook, Instagram, Linkedin, Mail, Phone, Twitter } from 'lucide-react'
import Link from 'next/link'
import { links as linkGroups } from './constants/links'
import ThemeSwitch from '@/app/(admin)/admin/components/ThemeSwitch'

const Footer = () => {
	const date = new Date()
	const year = date.getFullYear()

	return (
		<footer className='mt-12 border-t pt-12'>
			<div className='wrapper'>
				<div className='flex flex-wrap gap-x-16 gap-y-16'>
					<div className='mr-auto flex flex-col gap-8'>
						<div>
							<div className='text-4xl font-black'>SdN</div>
						</div>

						<div className='flex flex-col gap-2 text-muted-foreground'>
							<div className='flex items-center gap-4'>
								<Phone className='h-4 w-4' />
								<span>+48 123 456 789</span>
							</div>
							<div className='flex items-center gap-4'>
								<Phone className='h-4 w-4' />
								<span>+48 000 123 456</span>
							</div>
							<div className='flex items-center gap-4'>
								<Mail className='h-4 w-4' />
								<span>kontakt@studiadlanauczycieli.pl</span>
							</div>
						</div>
					</div>

					<div className='flex flex-col gap-6 md:w-full md:flex-row md:gap-16 lg:w-auto'>
						{linkGroups.map(group => (
							<div key={group.title}>
								<h5 className='mb-4 text-sm font-semibold'>{group.title}</h5>
								<ul className='flex flex-row flex-wrap gap-x-4 gap-y-1 md:flex-col md:gap-2'>
									{group.links.map(link => (
										<li key={link.link}>
											<Link href={link.link} className={cn('w-max text-muted-foreground hover:underline')}>
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
							Copyright &copy; {year ?? 2023} Studia dla Nauczycieli. Wszelkie Prawa Zastrzeżone.
						</p>
					</div>
					<div className='flex flex-wrap items-center justify-center gap-4'>
						<ThemeSwitch />
						<IconBadge href='' name='Twitter' Icon={Twitter} />
						<IconBadge href='' name='Facebook' Icon={Facebook} />
						<IconBadge href='' name='Instagram' Icon={Instagram} />
						<IconBadge href='' name='Linkedin' Icon={Linkedin} />
					</div>
				</div>
			</div>
		</footer>
	)
}

export default Footer
