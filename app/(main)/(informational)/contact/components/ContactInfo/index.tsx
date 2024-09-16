import { H3, Muted } from '@/app/components/ui/Typography'
import { siteConfig } from '@/config/site'
import { capitalize, cn } from '@/lib/utils'
import { Facebook, Instagram, LucideIcon, MailIcon, MessageCircleHeartIcon, PhoneIcon } from 'lucide-react'
import Link from 'next/link'

type Props = {}

const INFO = [
	{
		title: 'Napisz do nas',
		description: 'Odpowiadamy w ciągu 24 godzin.',
		Icon: MailIcon,
		links: [
			{
				href: `mailto:${siteConfig.contact.emails.contact}`,
				text: siteConfig.contact.emails.contact,
				Icon: MailIcon
			}
		]
	},
	{
		title: 'Zadzwoń',
		description: 'Pon-pt w godzinach 9:00-17:00.',
		Icon: PhoneIcon,
		links: [
			{
				href: `tel:${siteConfig.contact.phones.contact}`,
				text: siteConfig.contact.phones.contact,
				Icon: PhoneIcon
			}
		]
	},
	{
		title: 'Śledź nas',
		description: 'Bądź na bieżąco z najnowszymi informacjami.',
		Icon: MessageCircleHeartIcon,
		links: Object.entries(siteConfig.links).map(([key, value]) => {
			const Icon = {
				facebook: Facebook,
				instagram: Instagram
			}[key] as LucideIcon

			return { href: value, text: capitalize(key), Icon }
		})
	}
]

const ContactInfo = (props: Props) => {
	return (
		<div className='flex grow flex-col gap-4'>
			<div className='grid grid-cols-1 gap-x-12 gap-y-12'>
				{INFO.map((info, i) => (
					<div key={`${i}-${info.title}`} className='flex'>
						<div className='h-max rounded-md border p-2'>
							<info.Icon className='size-4' />
						</div>
						<div className='px-4'>
							<H3 className='text-lg font-semibold'>{info.title}</H3>
							<Muted className=''>{info.description}</Muted>

							<div className='mt-2 space-y-1'>
								{info.links.map((link, i) => (
									<DetailsLink key={i} href={link.href} text={link.text} />
								))}
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default ContactInfo

const DetailsLink = ({
	href,
	text,

	className
}: {
	href: string
	text: string
	className?: string
}) => {
	return (
		<Link
			href={href}
			className={cn('flex items-center gap-2 font-medium underline duration-300 hover:decoration-primary', className)}>
			<span>{text}</span>
		</Link>
	)
}
