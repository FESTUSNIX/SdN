'use client'

import { useGlobalModalContext } from '@/app/(admin)/admin/context/GlobalModalContext'
import UserAvatar from '@/app/components/UserAvatar'
import { Button } from '@/app/components/ui/Button'
import { ScrollArea } from '@/app/components/ui/ScrollArea'
import { H3, Muted } from '@/app/components/ui/Typography'
import { ChevronRightIcon, Mail, Pen, ScrollText } from 'lucide-react'
import { useState } from 'react'
import { Resizable } from 'react-resizable'
import AddEmail from '../AddEmail'
import { Prisma } from '@prisma/client'
import EditorOutput from '@/app/components/EditorOutput'
import ViewEmail from '../ViewEmail'

type Props = {
	unitId: number
	emails: {
		id: number
		title: string
		content: Prisma.JsonValue
		sentAt: Date | null
		sentTo: string[]
		user: {
			name: string | null
			image: string | null
			email: string
		}
	}[]
}

const Emails = ({ unitId, emails }: Props) => {
	const { openModal } = useGlobalModalContext()

	const [open, setOpen] = useState(true)
	const [size, setSize] = useState({
		width: 384,
		height: 0
	})

	const onResize = (event: any, { node, size, handle }: any) => setSize({ width: size.width, height: size.height })

	return (
		<Resizable
			axis='x'
			width={size.width}
			onResize={onResize}
			minConstraints={[320, 0]}
			handle={<div className='absolute left-0 top-0 h-full w-1.5 cursor-w-resize' />}
			resizeHandles={['w']}>
			<div
				className='relative ml-1 flex h-screen w-96 shrink-0 flex-col border-l bg-background duration-300'
				style={{ width: open ? size.width + 'px' : 0 }}>
				<div className='flex items-center justify-between border-b px-4 py-4'>
					<h2 className='mr-6 text-lg font-bold'>Emails</h2>
					<div className='h-10 w-10'></div>
					<Button
						variant={'secondary'}
						className='fixed right-4 top-4 aspect-square p-2'
						onClick={() => {
							setOpen(prev => !prev)
						}}>
						{open && <ChevronRightIcon className='h-4 w-4' />}
						{!open && <Mail className='h-4 w-4' />}
					</Button>
				</div>

				<ScrollArea className='max'>
					<div className='grid gap-2 px-4 py-6'>
						{emails.map(({ title, content, id, sentAt, user, sentTo }) => (
							<button
								key={id}
								onClick={() => {
									openModal(
										'CUSTOM',
										undefined,
										<ViewEmail
											emailId={id}
											content={content}
											sentAt={sentAt}
											title={title}
											user={user}
											sentTo={sentTo}
										/>
									)
								}}
								className='flex gap-x-4 gap-y-2 overflow-hidden rounded-lg border p-4'>
								<UserAvatar
									user={{ name: user.name, image: user.image }}
									className='col-start-1 col-end-2 row-start-1 row-end-2'
								/>
								<div className='flex grow flex-col items-start'>
									<div className='flex w-full items-center justify-between gap-2'>
										<H3 size='sm' className='truncate leading-tight'>
											{title}
										</H3>
										<Muted className='text-xs'>{sentAt?.toLocaleDateString()}</Muted>
									</div>
									<Muted className='truncate'>by {user.name}</Muted>
								</div>
							</button>
						))}
					</div>
				</ScrollArea>

				<div className='mt-auto flex items-center gap-2 border-t px-6 py-6'>
					<Button
						className='grow'
						onClick={() => {
							openModal('CUSTOM', undefined, <AddEmail unitId={unitId} />)
						}}>
						<ScrollText className='mr-2 h-4 w-4' />
						Add new
					</Button>
				</div>
			</div>
		</Resizable>
	)
}

export default Emails
