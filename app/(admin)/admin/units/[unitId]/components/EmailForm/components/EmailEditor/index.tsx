'use client'

// Thanks to Josh from https://www.youtube.com/@joshtriedcoding, make sure to subscribe

import '@/app/components/EditorJs/editor.css'
import { ScrollArea } from '@/app/components/ui/scroll-area'
import type EditorJS from '@editorjs/editorjs'
import { ToolConstructable } from '@editorjs/editorjs'
import { useCallback, useEffect, useRef } from 'react'
import { ControllerRenderProps } from 'react-hook-form'

type Props = {
	field: ControllerRenderProps<any, string>
	placeholder?: string
	open: boolean
}

const EmailEditor = ({ open, field, placeholder = 'Zacznij pisać tekst tutaj' }: Props) => {
	const editorRef = useRef<EditorJS>()

	const initializeEditor = useCallback(async () => {
		const EditorJS = (await import('@editorjs/editorjs')).default
		const Header = (await import('@editorjs/header')).default
		const NestedList = (await import('@editorjs/nested-list')).default
		const RawTool = (await import('@editorjs/raw')).default

		if (!editorRef.current && open) {
			const editor = new EditorJS({
				holder: 'editor',
				onReady() {
					editorRef.current = editor
				},
				placeholder: placeholder,
				inlineToolbar: true,
				data: { blocks: field.value || [] },
				tools: {
					header: {
						class: Header as unknown as ToolConstructable,
						config: {
							levels: [1, 2, 3, 4]
						}
					},
					list: {
						class: NestedList,
						inlineToolbar: true,
						config: {
							defaultStyle: 'unordered'
						}
					},
					raw: RawTool
				},
				onChange: async () => {
					const content = await editor.saver.save()

					field.onChange(content.blocks)
				}
			})
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		const init = async () => {
			await initializeEditor()
		}

		if (open) {
			init()

			return () => {
				if (editorRef.current) {
					editorRef.current.destroy()
					editorRef.current = undefined
				}
			}
		}
	}, [open, initializeEditor])

	if (!open) return null

	return (
		<div className='custom-editor tw-prose min-w-full rounded-md border p-4 text-foreground'>
			<ScrollArea className='h-[500px]'>
				<div id='editor' className='min-h-[500px]' />
			</ScrollArea>
		</div>
	)
}

export default EmailEditor
