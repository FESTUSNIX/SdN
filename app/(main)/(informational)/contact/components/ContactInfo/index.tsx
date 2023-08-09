import { socialMedia } from '@/app/(main)/constants/socialMedia'
import IconBadge from '@/app/components/IconBadge'
import { Button } from '@/app/components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/Card'
import { Facebook, Instagram, Linkedin, Mail, Phone, Twitter } from 'lucide-react'

type Props = {}

const ContactInfo = (props: Props) => {
	return (
		<div className='flex grow flex-col gap-4'>
			<Card>
				<CardHeader className='flex flex-row items-center gap-x-4'>
					<Button variant={'outline'} size={'icon'}>
						<Phone className='h-5 w-5' />
					</Button>
					<div>
						<CardTitle>Telefon</CardTitle>
						<CardDescription>Pon-Pt od 8 do 16.</CardDescription>
					</div>
				</CardHeader>
				<CardContent>
					<p>+48 123 346 019</p>
					<p>+48 634 456 742</p>
				</CardContent>
			</Card>

			<Card>
				<CardHeader className='flex flex-row items-center gap-x-4'>
					<Button variant={'outline'} size={'icon'}>
						<Mail className='h-5 w-5' />
					</Button>
					<div>
						<CardTitle>Email</CardTitle>
						<CardDescription>Odpisujemy do 4 godzin.</CardDescription>
					</div>
				</CardHeader>
				<CardContent>
					<p>kontakt@studiadlanauczycieli.pl</p>
				</CardContent>
			</Card>

			<div className='mb-12 mt-8 md:mb-0 md:mt-auto'>
				<div className='flex flex-wrap items-center gap-4'>
					<IconBadge href={socialMedia.twitter} name='Twitter' Icon={Twitter} />
					<IconBadge href={socialMedia.facebook} name='Facebook' Icon={Facebook} />
					<IconBadge href={socialMedia.instagram} name='Instagram' Icon={Instagram} />
					<IconBadge href={socialMedia.linkedIn} name='Linkedin' Icon={Linkedin} />
				</div>
			</div>
		</div>
	)
}

export default ContactInfo
