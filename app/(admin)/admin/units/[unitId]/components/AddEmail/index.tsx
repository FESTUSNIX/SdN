import { useGlobalModalContext } from '@/app/(admin)/admin/context/GlobalModalContext'
import FirstUnitEmail from '@/app/(admin)/admin/email/components/FirstUnitEmail'
import { Button } from '@/app/components/ui/Button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/app/components/ui/Dialog'
import { ScrollArea } from '@/app/components/ui/ScrollArea'
import { UnitEmailPayload, UnitEmailValidator } from '@/lib/validators/unitEmail'
import { zodResolver } from '@hookform/resolvers/zod'
import { Major, Qualification, Unit } from '@prisma/client'
import { render } from '@react-email/render'
import { useSession } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import AddEmailSubmit from '../AddEmailSubmit'
import EmailForm from '../EmailForm'

type Props = {
	unitId: number
	majors: (Major & { qualifications: Pick<Qualification, 'name'>[] })[]
	unit: Unit
}

const AddEmail = ({ unitId, majors, unit }: Props) => {
	const { data: session } = useSession()

	const { closeModal, modalState } = useGlobalModalContext()
	const { show } = modalState

	const emailHtml = render(<FirstUnitEmail majors={majors} unit={unit} />)
	const emailPlainText = render(<FirstUnitEmail majors={majors} unit={unit} />, {
		plainText: true
	})

	const form = useForm<UnitEmailPayload>({
		resolver: zodResolver(UnitEmailValidator.omit({ unitId: true })),
		defaultValues: {
			title: '',
			content: { html: emailHtml, text: emailPlainText },
			sentBy: session?.user?.id,
			sentAt: new Date(),
			unitId: unitId,
			sendTo: []
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
						<DialogTitle>Send a new email</DialogTitle>
					</DialogHeader>

					<div className='mt-6'>
						<EmailForm form={form} emailPlainText={emailPlainText} emailHtml={emailHtml} />
					</div>

					<DialogFooter className='mt-6 gap-y-2'>
						<Button variant={'outline'} onClick={() => closeModal()}>
							Cancel
						</Button>

						<AddEmailSubmit form={form} unitId={unitId} emailPlainText={emailPlainText} emailHtml={emailHtml} />
					</DialogFooter>
				</ScrollArea>
			</DialogContent>
		</Dialog>
	)
}

export default AddEmail
