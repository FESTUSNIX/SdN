import { ContextMenuItem } from '@/app/components/ui/ContextMenu'
import { Dialog, DialogContent, DialogTrigger } from '@/app/components/ui/dialog'
import React, { forwardRef } from 'react'

type Props = {
	triggerChildren: React.ReactNode
	children: React.ReactNode
	onSelect?: (event: Event) => void
	onOpenChange?: (open: boolean) => void
	open?: boolean
	dialogClassName?: string
}

export const DialogItem = forwardRef<HTMLDivElement, Props>((props, forwardedRef) => {
	const { dialogClassName, triggerChildren, children, onSelect, onOpenChange, open, ...itemProps } = props
	return (
		<Dialog onOpenChange={onOpenChange} open={open}>
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
