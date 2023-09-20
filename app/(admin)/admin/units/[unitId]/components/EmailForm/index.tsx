import { TextField } from '@/app/components/Forms/TextField'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/app/components/ui/Form'
import { UnitEmailPayload } from '@/lib/validators/unitEmail'
import { ControllerRenderProps, UseFormReturn } from 'react-hook-form'
import EmailEditor from './components/EmailEditor'
import SendTo from './components/SendTo'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/Tabs/tabs'

type Props = {
	form: UseFormReturn<UnitEmailPayload, any, undefined>
	emailHtml: string
	emailPlainText: string
}

const EmailForm = ({ form, emailHtml, emailPlainText }: Props) => {
	console.log(emailPlainText)

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
