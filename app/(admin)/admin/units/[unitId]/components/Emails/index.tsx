'use client'

import { useGlobalModalContext } from '@/app/(admin)/admin/context/GlobalModalContext'
import { ConditionalWrapper } from '@/app/components/ConditionalWrapper'
import UserAvatar from '@/app/components/UserAvatar'
import { Button } from '@/app/components/ui/Button'
import { ScrollArea } from '@/app/components/ui/ScrollArea'
import { H3, Muted } from '@/app/components/ui/Typography'
import useResponsive from '@/app/hooks/useResponsive'
import { cn } from '@/lib/utils/utils'
import { Prisma } from '@prisma/client'
import { Mail, ScrollText, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Resizable } from 'react-resizable'
import AddEmail from '../AddEmail'
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

	const [open, setOpen] = useState(false)
	const [size, setSize] = useState({
		width: 384,
		height: 0
	})

	const onResize = (event: any, { node, size, handle }: any) => setSize({ width: size.width, height: size.height })

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

			<ConditionalWrapper
				condition={isLG}
				wrapper={children => (
					<Resizable
						axis='x'
						width={size.width}
						onResize={onResize}
						minConstraints={[320, 0]}
						handle={<div className='absolute left-0 top-0 h-full w-1.5 cursor-w-resize' />}
						resizeHandles={['w']}>
						{children}
					</Resizable>
				)}>
				<div
					className='fixed right-0 top-0 z-30 ml-1 flex h-screen shrink-0 flex-col overflow-hidden border-l bg-background duration-300 lg:relative lg:w-96'
					style={{ width: open ? (isLG ? size.width + 'px' : '100%') : 0 }}>
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
			</ConditionalWrapper>
		</>
	)
}

export default Emails
