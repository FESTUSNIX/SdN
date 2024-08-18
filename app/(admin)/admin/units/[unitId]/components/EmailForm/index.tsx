import { TextField } from '@/app/components/Forms/TextField'
import { Form } from '@/app/components/ui/form'
import { UnitEmailPayload } from '@/lib/validators/unitEmail'
import { UseFormReturn } from 'react-hook-form'
import PreviewTabs from '../PreviewTabs'
import SendTo from './components/SendTo'

type Props = {
	form: UseFormReturn<UnitEmailPayload, any, undefined>
	emailHtml: string
	emailPlainText: string
}

const EmailForm = ({ form, emailHtml, emailPlainText }: Props) => {
	return (
		<Form {...form}>
			<form>
				<div className='space-y-8 px-2'>
					<TextField control={form.control} accessorKey='title' label='Title' placeholder='Aa...' />

					<SendTo control={form.control} />

					<PreviewTabs emailHtml={emailHtml} emailPlainText={emailPlainText} />
				</div>
			</form>
		</Form>
	)
}

export default EmailForm
