// Thanks to Josh from https://www.youtube.com/@joshtriedcoding, make sure to subscribe

'use client'

import dynamic from 'next/dynamic'
import { CustomLinkToolRenderer } from './components/LinkTool'
import { CustomListRenderer } from './components/NestedList'
import { CustomTableRenderer } from './components/Table'
import { CustomRawHTMLRenderer } from './components/RawHTML'
import { cn } from '@/lib/utils/utils'

const Output = dynamic(async () => (await import('editorjs-react-renderer')).default, {
	ssr: false
})

const renderers = {
	linktool: CustomLinkToolRenderer,
	list: CustomListRenderer,
	table: CustomTableRenderer,
	raw: CustomRawHTMLRenderer
}

type OutputProps = {
	content: any
	prose?: boolean
}

const EditorOutput = ({ content, prose = true }: OutputProps) => {
	if (!content) return <div>Could not find content</div>

	return (
		<div className={cn(prose && 'tw-prose')}>
			<Output
				data={{ blocks: content }}
				renderers={renderers}
				config={{
					linkTool: {
						disableDefaultStyle: true
					}
				}}
			/>
		</div>
	)
}

export default EditorOutput
