import { TextField } from '@/app/components/Forms/TextField'
import { Form } from '@/app/components/ui/Form'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/Tabs/tabs'
import { UnitEmailPayload } from '@/lib/validators/unitEmail'
import { UseFormReturn } from 'react-hook-form'
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
					<TextField formControl={form.control} accessorKey='title' label='Title' placeholder='Aa...' />

					<SendTo formControl={form.control} />

					<Tabs defaultValue='html' className='w-full'>
						<TabsList>
							<TabsTrigger value='html'>HTML</TabsTrigger>
							<TabsTrigger value='text'>Plain text</TabsTrigger>
						</TabsList>

						<TabsContent value='html'>
							<iframe srcDoc={emailHtml} className='h-full min-h-[600px] w-full rounded-md border' />
						</TabsContent>
						<TabsContent value='text'>
							<div className='whitespace-pre-line rounded-md border p-4'>{emailPlainText}</div>
						</TabsContent>
					</Tabs>
				</div>
			</form>
		</Form>
	)
}

export default EmailForm
