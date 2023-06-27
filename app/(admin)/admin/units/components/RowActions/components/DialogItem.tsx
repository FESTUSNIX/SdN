import { ContextMenu, ContextMenuItem } from '@/app/components/ui/ContextMenu'
import { Dialog, DialogContent, DialogTrigger } from '@/app/components/ui/Dialog'
import { forwardRef } from 'react'
import { DialogProps } from '@radix-ui/react-dialog'
import React from 'react'

type Props = {
	triggerChildren: React.ReactNode
	children: React.ReactNode
	onSelect?: (event: Event) => void
	onOpenChange?: (open: boolean) => void
	dialogClassName?: string
}

export const DialogItem = forwardRef<HTMLDivElement, Props>((props, forwardedRef) => {
	const { dialogClassName, triggerChildren, children, onSelect, onOpenChange, ...itemProps } = props
	return (
		<Dialog onOpenChange={onOpenChange}>
			<DialogTrigger asChild>
				<ContextMenuItem
					{...itemProps}
					ref={forwardedRef}
					onSelect={event => {
						event.preventDefault()
						onSelect && onSelect(event)
					}}
					asChild>
					{triggerChildren}
				</ContextMenuItem>
			</DialogTrigger>

			<DialogContent className={dialogClassName}>{children}</DialogContent>
		</Dialog>
	)
})

DialogItem.displayName = 'DialogItem'
