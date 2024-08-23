import { H2, H3 } from '@/app/components/ui/Typography'
import { Unit } from '@prisma/client'
import { ClipboardEdit, FileDigit, Globe, Mail, Phone, School, Unlock } from 'lucide-react'
import Link from 'next/link'

type Props = Pick<Unit, 'website' | 'email' | 'phone' | 'unitType' | 'isPublic' | 'nip' | 'regon'>

const Details = ({ email, isPublic, nip, phone, regon, unitType, website }: Props) => {
	return (
		<section className='border-b py-6'>
			<H2 className='mb-4' size='sm'>
				Podstawowe informacje
			</H2>
			<div className='grid grid-cols-1 gap-x-4 gap-y-6 md:grid-cols-2'>
				{[
					{
						title: 'Email',
						content: email,
						Icon: Mail
					},
					{
						title: 'Numer telefonu',
						content: phone,
						Icon: Phone
					},
					{
						title: 'Strona internetowa',
						content: (
							<Link href={website} target='_blank' rel='noopener' className='break-all hover:underline'>
								{website}
							</Link>
						),
						Icon: Globe
					},
					{
						title: 'Typ jednostki',
						content: <span className='inline-block first-letter:uppercase'>{unitType}</span>,
						Icon: School
					},
					{
						title: 'Publiczna',
						content: isPublic ? 'Tak' : 'Nie',
						Icon: Unlock
					},
					{
						title: 'NIP',
						content: nip,
						Icon: ClipboardEdit
					},
					{
						title: 'REGON',
						content: regon,
						Icon: FileDigit
					}
				].map(
					item =>
						item.content && (
							<div key={item.title} className='flex items-start'>
								<div className='mr-4'>
									<item.Icon className='h-5 w-5 text-accent-foreground' />
								</div>
								<div className='flex flex-col'>
									<H3 size='sm' className='leading-5'>
										{item.title}
									</H3>
									<p className='text-base text-muted-foreground'>{item.content}</p>
								</div>
							</div>
						)
				)}
			</div>
		</section>
	)
}

export default Details
