import { useGlobalModalContext } from '@/app/(admin)/admin/context/GlobalModalContext'
import Editor from '@/app/(admin)/admin/components/MajorEditor'
import { TextField } from '@/app/components/Forms/TextField'
import { Button } from '@/app/components/ui/Button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/app/components/ui/Dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/app/components/ui/Form'
import { UnitEmailPayload, UnitEmailValidator } from '@/lib/validators/unitEmail'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSession } from 'next-auth/react'
import { Control, ControllerRenderProps, useForm } from 'react-hook-form'
import EmailEditor from '../EmailEditor'
import { ScrollArea } from '@/app/components/ui/ScrollArea'
import { useRef } from 'react'

type Props = {}

const EmailForm = (props: Props) => {
	const { closeModal, modalState } = useGlobalModalContext()
	const { show } = modalState

	const { data: session } = useSession()

	const childRef = useRef()

	const form = useForm<UnitEmailPayload>({
		resolver: zodResolver(UnitEmailValidator),
		defaultValues: {
			title: '',
			content: [],
			sentBy: '',
			sentAt: null
		}
	})

	const onSubmit = async () => {
		const userId = session?.user?.id
		if (!userId) return

		const { title } = form.getValues()

		const editorValue = await (childRef?.current as any).getCurrentValue()

		const payload: UnitEmailPayload = {
			title,
			content: editorValue,
			sentBy: userId,
			sentAt: new Date()
		}

		console.log(payload)
	}

	return (
		<Dialog
			open={show}
			onOpenChange={open => {
				if (!open) closeModal()
			}}>
			<DialogContent className='h-full sm:max-h-[calc(100vh-8rem)] md:!max-w-[700px] lg:!max-w-[900px]'>
				<ScrollArea>
					<DialogHeader>
						<DialogTitle>Add a new email</DialogTitle>
					</DialogHeader>

					<div className='mt-6'>
						<Form {...form}>
							<form>
								<div className='space-y-8 px-2'>
									<TextField formControl={form.control} accessorKey='title' label='Title' placeholder='Aa...' />

									<FormField
										control={form.control}
										name={'content'}
										render={({ field }) => (
											<FormItem>
												<FormLabel>Content</FormLabel>
												<FormControl>
													<EmailEditor ref={childRef} open={show} field={field as ControllerRenderProps<any, string>} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
							</form>
						</Form>
					</div>

					<DialogFooter className='mt-6 gap-y-2'>
						<Button variant={'outline'} onClick={() => closeModal()}>
							Cancel
						</Button>
						<Button
							onClick={() => {
								onSubmit()
							}}>
							Add new email
						</Button>
					</DialogFooter>
				</ScrollArea>
			</DialogContent>
		</Dialog>
	)
}

export default EmailForm
