'use client'

import { useGlobalModalContext } from '@/app/(admin)/admin/context/GlobalModalContext'
import { Button } from '@/app/components/ui/button'
import { ScrollArea } from '@/app/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import { EmailData } from '@/types/unitEmail'
import { Major, Qualification, Unit } from '@prisma/client'
import { Mail, ScrollText, X } from 'lucide-react'
import { useState } from 'react'
import AddEmail from '../AddEmail'
import EmailCard from '../EmailCard'

type Props = {
	unitId: number
	emails: EmailData[]
	majors: (Major & { qualifications: Pick<Qualification, 'name'>[] })[]
	unit: Unit
}

const Emails = ({ unitId, emails, majors, unit }: Props) => {
	const { openModal } = useGlobalModalContext()
	const [open, setOpen] = useState(false)

	return (
		<>
			<Button
				variant={'secondary'}
				className={cn('fixed right-4 top-[78px] z-30 aspect-square border p-2 md:top-4', open && 'max-lg:hidden')}
				onClick={() => {
					setOpen(prev => !prev)
				}}>
				{open && <X className='h-4 w-4' />}
				{!open && <Mail className='h-4 w-4' />}
			</Button>

			<div
				className={cn(
					'fixed right-0 top-0 z-30 ml-1 flex h-screen shrink-0 flex-col overflow-hidden border-l bg-background duration-300 lg:relative',
					open ? 'w-full lg:w-96' : 'w-0'
				)}>
				<div className='flex items-center justify-between border-b px-4 py-4'>
					<h2 className='mr-6 text-lg font-bold'>Emails</h2>
					<div className='lg:h-10 lg:w-10'></div>
					<Button
						variant={'secondary'}
						className={cn('aspect-square p-2')}
						onClick={() => {
							setOpen(false)
						}}>
						<X className='h-4 w-4' />
					</Button>
				</div>

				<ScrollArea className='max'>
					<div className='grid gap-2 px-4 py-6'>
						{emails.map(email => (
							<EmailCard key={email.id} {...email} />
						))}
					</div>
				</ScrollArea>

				<div className='mt-auto flex items-center gap-2 border-t px-6 py-6'>
					<Button
						className='grow'
						onClick={() => {
							openModal('CUSTOM', undefined, <AddEmail unitId={unitId} majors={majors} unit={unit} />)
						}}>
						<ScrollText className='mr-2 h-4 w-4' />
						Add new
					</Button>
				</div>
			</div>
		</>
	)
}

export default Emails
