import { useGlobalModalContext } from '@/app/(admin)/admin/context/GlobalModalContext'
import { Button } from '@/app/components/ui/Button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/app/components/ui/Dialog'
import { ScrollArea } from '@/app/components/ui/ScrollArea'
import { UnitEmailPayload, UnitEmailValidator } from '@/lib/validators/unitEmail'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSession } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import AddEmailSubmit from '../AddEmailSubmit'
import EmailForm from '../EmailForm'
import { Major } from '@prisma/client'

type Props = {
	unitId: number
	majors: Major[]
}

const AddEmail = ({ unitId, majors }: Props) => {
	const { data: session } = useSession()

	const { closeModal, modalState } = useGlobalModalContext()
	const { show } = modalState

	const form = useForm<UnitEmailPayload>({
		resolver: zodResolver(
			UnitEmailValidator.omit({ unitId: true }).extend({
				content: z.array(z.any()).refine(v => v.length > 0, {
					message: 'Email content cannot be empty.'
				})
			})
		),
		defaultValues: {
			title: '',
			content: [],
			sentBy: session?.user?.id,
			sentAt: new Date(),
			unitId: unitId,
			sentTo: []
		}
	})

	if (!session) return <div>Loading...</div>

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
						<EmailForm form={form} />

						<div className='flex flex-col gap-2'>
							{majors.map(major => (
								<div key={major.id}>
									#{major.id} - {major.name}, {JSON.stringify(major)}
								</div>
							))}
						</div>
					</div>

					<DialogFooter className='mt-6 gap-y-2'>
						<Button variant={'outline'} onClick={() => closeModal()}>
							Cancel
						</Button>

						<AddEmailSubmit form={form} unitId={unitId} session={session} />
					</DialogFooter>
				</ScrollArea>
			</DialogContent>
		</Dialog>
	)
}

export default AddEmail
