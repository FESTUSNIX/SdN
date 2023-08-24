import { TextField } from '@/app/components/Forms/TextField'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/app/components/ui/Form'
import { UnitEmailPayload } from '@/lib/validators/unitEmail'
import { ControllerRenderProps, UseFormReturn } from 'react-hook-form'
import EmailEditor from './components/EmailEditor'
import SentTo from './components/SentTo'

type Props = {
	form: UseFormReturn<UnitEmailPayload, any, undefined>
}

const EmailForm = ({ form }: Props) => {
	return (
		<Form {...form}>
			<form>
				<div className='space-y-8 px-2'>
					<TextField formControl={form.control} accessorKey='title' label='Title' placeholder='Aa...' />

					<SentTo formControl={form.control} />

					
					<FormField
						control={form.control}
						name={'content'}
						render={({ field }) => (
							<FormItem>
								<FormLabel>Content</FormLabel>
								<FormControl>
									<EmailEditor open={true} field={field as ControllerRenderProps<any, string>} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

				</div>
			</form>
		</Form>
	)
}

export default EmailForm
