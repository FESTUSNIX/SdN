import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/app/components/ui/Dialog'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/app/components/ui/Form'
import { cn } from '@/lib/utils/utils'
import { useRef, useState } from 'react'
import { Control } from 'react-hook-form'
import Editor from '../../Editor'
import { Button } from '../../ui/Button'
import { ScrollArea } from '../../ui/ScrollArea'
import { Textarea } from '../../ui/Textarea/textarea'

type Props = {
	formControl: Control<any>
	accessorKey: string
	label?: string
	placeholder?: string
	description?: string
	modalTitle?: string
	modalDescription?: string
}

export const EditorField = ({
	formControl,
	label,
	accessorKey,
	placeholder,
	description,
	modalDescription,
	modalTitle = 'Add rich text'
}: Props) => {
	const [isOpen, setIsOpen] = useState(false)

	const childRef = useRef()

	return (
		<FormField
			control={formControl}
			name={accessorKey}
			render={({ field }) => (
				<FormItem>
					{label && <FormLabel>{label}</FormLabel>}
					<FormControl>
						<Dialog open={isOpen} onOpenChange={setIsOpen}>
							<DialogTrigger asChild>
								<div>
									<Textarea placeholder={'Click here for full editor'} />
									{description && <FormDescription>{description}</FormDescription>}
								</div>
							</DialogTrigger>
							<DialogContent className='flex h-full flex-col gap-0 p-0 sm:max-h-[calc(100vh-8rem)] md:!max-w-[700px] lg:!max-w-[900px] '>
								<DialogHeader className={cn('border-b p-6', modalDescription ? 'pb-2' : 'pb-4')}>
									<DialogTitle>{modalTitle}</DialogTitle>
									{modalDescription && <DialogDescription>{modalDescription}</DialogDescription>}
								</DialogHeader>
								<ScrollArea className='max-h-full grow px-6'>
									<Editor open={isOpen} placeholder={placeholder} field={field} ref={childRef} />
								</ScrollArea>
								<DialogFooter className='border-t p-6 pt-4'>
									<div className='flex items-center gap-2'>
										<Button variant={'secondary'} onClick={() => setIsOpen(false)}>
											Cancel
										</Button>
										<Button
											onClick={() => {
												;(childRef?.current as any).onEditorSubmit()
												setIsOpen(false)
											}}>
											Submit
										</Button>
									</div>
								</DialogFooter>
							</DialogContent>
						</Dialog>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}
