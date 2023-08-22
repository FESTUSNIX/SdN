'use client'

import { useGlobalModalContext } from '@/app/(admin)/admin/context/GlobalModalContext'
import UserAvatar from '@/app/components/UserAvatar'
import { Button } from '@/app/components/ui/Button'
import { ScrollArea } from '@/app/components/ui/ScrollArea'
import { H3, Muted } from '@/app/components/ui/Typography'
import { ChevronRightIcon, Mail } from 'lucide-react'
import { useState } from 'react'
import { Resizable } from 'react-resizable'
import EmailForm from '../EmailForm'

type Props = {}

const Emails = (props: Props) => {
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
						{[
							{
								title: 'Email title',
								createdBy: 'Mateusz Hada',
								createdAt: new Date(),
								content:
									'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi beatae, repellendus iste, quos fugiat dolor laudantium expedita necessitatibus, et delectus facilis distinctio quia. Possimus aperiam et eos, error adipisci ab officia aut expedita inventore repellat recusandae delectus laudantium minus similique doloremque obcaecati neque nostrum asperiores incidunt vitae modi minima. Architecto?'
							}
						].map(({ content, createdAt, createdBy, title }, i) => (
							<button
								key={i}
								onClick={() => {
									openModal('CUSTOM', undefined, <EmailForm />)
								}}
								className='grid grid-cols-[40px_1fr] grid-rows-[auto_auto] gap-x-4 gap-y-2 overflow-hidden rounded-lg border p-4'>
								<UserAvatar
									user={{ name: createdBy, image: null }}
									className='col-start-1 col-end-2 row-start-1 row-end-2'
								/>
								<div className='flex flex-col items-start'>
									<div className='flex w-full items-center justify-between gap-2'>
										<H3 size='sm' className='truncate leading-tight'>
											{title}
										</H3>
										<Muted className='text-xs'>{createdAt.toLocaleDateString()}</Muted>
									</div>
									<Muted className='truncate'>by {createdBy}</Muted>
								</div>

								<Muted className='col-start-2 col-end-3 row-start-2 row-end-3 truncate'>{content}</Muted>
							</button>
						))}
					</div>
				</ScrollArea>

				<div className='mt-auto flex items-center gap-2 border-t px-6 py-6'>
					<Button className='grow' onClick={() => {}}>
						Add new
					</Button>
				</div>
			</div>
		</Resizable>
	)
}

export default Emails
