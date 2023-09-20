'use client'

import { useGlobalModalContext } from '@/app/(admin)/admin/context/GlobalModalContext'
import { Button } from '@/app/components/ui/Button'
import { ScrollArea } from '@/app/components/ui/ScrollArea'
import useResponsive from '@/app/hooks/useResponsive'
import { cn } from '@/lib/utils/utils'
import { Major, Prisma, Qualification } from '@prisma/client'
import { Mail, ScrollText, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import AddEmail from '../AddEmail'
import EmailCard from '../EmailCard'

type Props = {
	unitId: number
	emails: {
		id: number
		title: string
		content: Prisma.JsonValue
		sentAt: Date
		sentTo: string[]
		user: {
			name: string | null
			image: string | null
			email: string
		}
	}[]
	majors: (Major & { qualifications: Pick<Qualification, 'name'>[] })[]
}

const Emails = ({ unitId, emails, majors }: Props) => {
	const { openModal } = useGlobalModalContext()

	const [open, setOpen] = useState(false)

	const { isLG: lgBreakpoint } = useResponsive()
	const [isLG, setIsLG] = useState(false)

	useEffect(() => {
		setIsLG(lgBreakpoint)
	}, [lgBreakpoint])

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
				className='fixed right-0 top-0 z-30 ml-1 flex h-screen shrink-0 flex-col overflow-hidden border-l bg-background duration-300 lg:relative lg:w-96'
				style={{ width: open ? (isLG ? '384px' : '100%') : 0 }}>
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
							openModal('CUSTOM', undefined, <AddEmail unitId={unitId} majors={majors} />)
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
