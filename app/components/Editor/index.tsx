'use client'

// Thanks to Josh from https://www.youtube.com/@joshtriedcoding, make sure to subscribe

import '@/app/(main)/styles/editor.css'
import type EditorJS from '@editorjs/editorjs'
import { ToolConstructable } from '@editorjs/editorjs'
import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef } from 'react'
import { ControllerRenderProps } from 'react-hook-form'

type Props = {
	field: ControllerRenderProps<any, string>
	placeholder?: string
	open: boolean
}

const Editor = forwardRef(({ open, field, placeholder = 'Zacznij pisać tekst tutaj' }: Props, ref) => {
	const editorRef = useRef<EditorJS>()

	const initializeEditor = useCallback(async () => {
		const EditorJS = (await import('@editorjs/editorjs')).default
		const Header = (await import('@editorjs/header')).default
		const LinkTool = (await import('@editorjs/link')).default
		const Table = (await import('@editorjs/table')).default
		const NestedList = (await import('@editorjs/nested-list')).default

		// const lcs = localStorage.getItem('editorContent')

		// const parsedContent = lcs ? JSON.parse(lcs) : []
		console.log(field)
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
							levels: [3, 4]
						}
					},
					linkTool: {
						class: LinkTool,
						config: {
							endpoint: '/api/link'
						}
					},
					list: {
						class: NestedList,
						inlineToolbar: true,
						config: {
							defaultStyle: 'unordered'
						}
					},
					table: Table
				}
			})
		}
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

	const onSubmit = async () => {
		const editorOutput = await editorRef.current?.save()

		field.onChange(editorOutput?.blocks)
	}

	useImperativeHandle(ref, () => ({
		onEditorSubmit() {
			onSubmit()
		}
	}))

	if (!open) return null

	return (
		<form id='editor-form' onSubmit={onSubmit}>
			<div className='custom-editor prose min-w-full p-4 text-foreground dark:prose-invert'>
				<div id='editor' className='min-h-[500px]' />
			</div>
		</form>
	)
})

Editor.displayName = 'Editor'

export default Editor
