import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs'

type Props = {
	emailHtml: string
	emailPlainText: string
}

const PreviewTabs = ({ emailHtml, emailPlainText }: Props) => {
	return (
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
	)
}

export default PreviewTabs
