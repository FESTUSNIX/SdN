'use client'

import { useGlobalModalContext } from '@/app/(admin)/admin/context/GlobalModalContext'
import EditorOutput from '@/app/components/EditorOutput'
import UserAvatar from '@/app/components/UserAvatar'
import { Button } from '@/app/components/ui/Button'
import { Dialog, DialogContent, DialogFooter } from '@/app/components/ui/Dialog'
import { ScrollArea } from '@/app/components/ui/ScrollArea'
import { Separator } from '@/app/components/ui/Separator/separator'
import { H3, H4, Muted } from '@/app/components/ui/Typography'
import { Prisma } from '@prisma/client'
import { Pencil } from 'lucide-react'
import DeleteEmail from '../DeleteEmail'
import { toast } from 'react-hot-toast'

type Props = {
	emailId: number
	title: string
	content: Prisma.JsonValue
	sentAt: Date | null
	sentTo: string[]
	user: {
		name: string | null
		image: string | null
		email: string
	}
}

const ViewEmail = ({ content, sentAt, title, user, sentTo, emailId }: Props) => {
	const {
		modalState: { show },
		closeModal
	} = useGlobalModalContext()

	return (
		<Dialog
			open={show}
			onOpenChange={open => {
				if (!open) closeModal()
			}}>
			<DialogContent className='flex h-full flex-col overflow-hidden sm:max-h-[calc(100vh-8rem)] md:!max-w-2xl'>
				<div>
					<div className='mb-8 flex items-center gap-x-4'>
						<UserAvatar
							user={{ name: user?.name, image: user?.image }}
							className='col-start-1 col-end-2 row-start-1 row-end-2'
						/>
						<div className='flex w-full flex-col'>
							<H4 size='sm' className='truncate leading-tight'>
								{user.name}
							</H4>
							<Muted className='truncate'>{user.email}</Muted>
						</div>
					</div>

					<H3>{title}</H3>

					<div className='mt-2 flex items-center gap-2'>
						<H4 size='sm' className='leading-tight'>
							Sent to:
						</H4>
						<Muted className='leading-tight'>
							{sentTo.map(i => (
								<span key={i}>
									{i}
									{sentTo.indexOf(i) !== sentTo.length - 1 ? ', ' : ''}
								</span>
							))}
						</Muted>
					</div>
				</div>

				<Separator />

				<div className='mx-auto h-full w-full max-w-xl overflow-hidden'>
					<ScrollArea className='h-full'>
						<EditorOutput content={JSON.parse(content as string)} />
					</ScrollArea>
				</div>

				<DialogFooter>
					<div className='flex flex-wrap items-center gap-2'>
						{[
							{
								label: 'Edit',
								Icon: Pencil,
								onClick: () => {
									toast('Coming soon :)')
								}
							}
						].map(({ Icon, label, onClick }) => (
							<Button disabled key={label} variant={'outline'} size={'sm'} onClick={onClick} className='rounded-full'>
								<Icon className='mr-2 h-4 w-4 text-muted-foreground' /> {label}
							</Button>
						))}

						<DeleteEmail emailId={emailId} />
					</div>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

export default ViewEmail
