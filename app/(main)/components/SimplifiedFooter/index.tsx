import ThemeSwitch from '@/app/(admin)/admin/components/ThemeSwitch'
import IconBadge from '@/app/components/IconBadge'
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react'
import Link from 'next/link'

const links = [
	{
		label: 'Polityka prywatności',
		link: '/privacy-policy'
	},
	{
		label: 'Dla uczelni',
		link: '/work-with-us'
	}
]

const SimplifiedFooter = () => {
	const date = new Date()
	const year = date.getFullYear()

	return (
		<footer className='wrapper mt-8 flex flex-col items-center gap-y-6 py-6'>
			<div className='flex w-full flex-col-reverse items-center justify-between gap-y-6 lg:flex-row'>
				<div>
					<ul className='flex items-center gap-6'>
						{links.map(link => (
							<li key={link.link}>
								<Link href={link.link} className='text-base text-muted-foreground hover:underline'>
									{link.label}
								</Link>
							</li>
						))}
					</ul>
				</div>
				<div className='flex flex-wrap items-center justify-center gap-4'>
					<ThemeSwitch />
					<IconBadge href='' name='Twitter' Icon={Twitter} />
					<IconBadge href='' name='Facebook' Icon={Facebook} />
					<IconBadge href='' name='Instagram' Icon={Instagram} />
					<IconBadge href='' name='Linkedin' Icon={Linkedin} />
				</div>
			</div>
			<div>
				<p className='text-center text-sm text-muted-foreground md:w-max'>
					&copy; {year ?? 2023} Studia dla Nauczycieli. Wszelkie Prawa Zastrzeżone.
				</p>
			</div>
		</footer>
	)
}

export default SimplifiedFooter
