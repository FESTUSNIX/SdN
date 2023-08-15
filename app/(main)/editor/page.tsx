'use client'

import Editor from '@/app/components/Editor'
import EditorOutput from '@/app/components/EditorOutput'
import { H1 } from '@/app/components/ui/Typography'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/app/components/ui/Dialog'
import { Button } from '@/app/components/ui/Button'
import { Separator } from '@/app/components/ui/Separator/separator'
import { ScrollArea } from '@/app/components/ui/ScrollArea'
import { useState } from 'react'

const EditorPage = () => {
	const [open, setOpen] = useState(false)

	return (
		<main className='wrapper mt-12'>
			<H1 className='mb-4'>Editor test</H1>

			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger asChild>
					<Button>Open editor</Button>
				</DialogTrigger>
				<DialogContent className='flex h-full flex-col gap-0 p-0 sm:max-h-[calc(100vh-8rem)] md:!max-w-[700px] lg:!max-w-[900px] '>
					<DialogHeader className='border-b p-6 pb-2'>
						<DialogTitle>Major description</DialogTitle>
						<DialogDescription>
							Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus natus obcaecati iusto. Cupiditate
							deserunt sapiente molestiae, similique eos culpa? Nesciunt?
						</DialogDescription>
					</DialogHeader>
					<ScrollArea className='max-h-full grow px-6'>{/* <Editor open={open} /> */}</ScrollArea>
					<DialogFooter className='border-t p-6 pt-4'>
						<div className='flex items-center gap-2'>
							<Button variant={'secondary'} onClick={() => setOpen(false)}>
								Cancel
							</Button>
							<Button type='submit' form='editor-form'>
								Submit
							</Button>
						</div>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			<section className='prose max-w-full rounded-md border p-4 dark:prose-invert'>
				{EditorOutput && <EditorOutput />}
			</section>
		</main>
	)
}

export default EditorPage
