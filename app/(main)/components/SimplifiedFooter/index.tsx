import ThemeSwitch from '@/app/(admin)/admin/components/ThemeSwitch'
import IconBadge from '@/app/components/IconBadge'
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react'

const SimplifiedFooter = () => {
	const date = new Date()
	const year = date.getFullYear()

	return (
		<footer className='wrapper mt-8'>
			<div className='flex flex-col-reverse items-center justify-between gap-y-6 py-6 md:py-12 lg:flex-row'>
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
		</footer>
	)
}

export default SimplifiedFooter
