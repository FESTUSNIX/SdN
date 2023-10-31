import { useGlobalModalContext } from '@/app/(admin)/admin/context/GlobalModalContext'
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
import { Control, ControllerRenderProps, FieldValues, Path } from 'react-hook-form'
import Editor from '../EditorJs'
import EditorOutput from '../EditorOutput'
import { Button } from '../ui/Button'
import { ScrollArea } from '../ui/ScrollArea'
import { Muted } from '../ui/Typography'

type Props<T extends FieldValues> = {
	control?: Control<T>
	accessorKey: Path<T>
	label?: string
	placeholder?: string
	description?: string
	modalTitle?: string
	modalDescription?: string
}

export const EditorField = <T extends FieldValues>({
	control,
	label,
	accessorKey,
	placeholder,
	description,
	modalDescription,
	modalTitle
}: Props<T>) => {
	const [isOpen, setIsOpen] = useState(false)
	const childRef = useRef()
	const { openModal } = useGlobalModalContext()

	const handleUnsavedChanges = async (field: ControllerRenderProps<T, Path<T>>, open: boolean) => {
		if (open) return setIsOpen(open)

		const currentValue = await (childRef?.current as any).getCurrentValue()

		if (
			currentValue?.blocks &&
			currentValue.blocks.length &&
			JSON.stringify(currentValue?.blocks) !== JSON.stringify(field.value)
		) {
			return openModal('CUSTOM', {
				title: 'Czy napewno chcesz zamknąć',
				description: 'Masz niezapisane zmiany. Czy na pewno chcesz zamknąć panel? Twoje zmiany zostaną utracone.',
				onConfirm: () => {
					setIsOpen(false)
				},
				confirmButtonText: 'Zamknij',
				confirmButtonVariant: 'destructive',
				cancelButtonText: 'Anuluj'
			})
		}

		setIsOpen(open)
	}

	return (
		<FormField
			control={control}
			name={accessorKey}
			render={({ field }) => (
				<FormItem>
					{label && <FormLabel>{label}</FormLabel>}
					<FormControl>
						<Dialog
							open={isOpen}
							onOpenChange={open => {
								handleUnsavedChanges(field, open)
							}}>
							<DialogTrigger asChild>
								<div>
									<div className='flex max-h-72 min-h-[80px] w-full cursor-text overflow-y-auto rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'>
										{field.value && field.value?.length ? (
											<div className='pointer-events-none origin-top-left scale-75 select-none'>
												<EditorOutput content={field.value} />
											</div>
										) : (
											<Muted className='pointer-events-none select-none'>{placeholder}</Muted>
										)}
									</div>
									{description && <FormDescription>{description}</FormDescription>}
								</div>
							</DialogTrigger>
							<DialogContent className='flex h-full flex-col gap-0 p-0 sm:max-h-[calc(100vh-8rem)] md:!max-w-[700px] lg:!max-w-[900px] '>
								<DialogHeader className={cn('border-b p-6', modalDescription ? 'pb-2' : 'pb-4')}>
									<DialogTitle>{modalTitle || label}</DialogTitle>
									{modalDescription && <DialogDescription>{modalDescription}</DialogDescription>}
								</DialogHeader>
								<ScrollArea className='max-h-full grow px-6'>
									<Editor
										open={isOpen}
										placeholder={placeholder}
										field={field as unknown as ControllerRenderProps<any, string>}
										ref={childRef}
									/>
								</ScrollArea>
								<DialogFooter className='border-t p-6 pt-4'>
									<div className='flex items-center gap-2'>
										<Button variant={'secondary'} onClick={() => setIsOpen(false)}>
											Anuluj
										</Button>
										<Button
											onClick={() => {
												;(childRef?.current as any).onEditorSubmit()
												setIsOpen(false)
											}}>
											Potwierdź
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
