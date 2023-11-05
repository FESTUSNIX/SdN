'use client'

import { Slot, SlotProps } from '@radix-ui/react-slot'
import { SignOutParams, signOut } from 'next-auth/react'
import { forwardRef } from 'react'

type Props = SlotProps &
	React.RefAttributes<HTMLElement> & {
		signOutOptions?: SignOutParams<true> | undefined
	}

export const SignOutShell = forwardRef<HTMLElement, Props>(({ onClick, signOutOptions, children, ...props }, ref) => {
	return (
		<Slot
			ref={ref}
			{...props}
			onClick={e => {
				onClick && onClick(e)

				signOut(signOutOptions)
			}}>
			{children}
		</Slot>
	)
})
SignOutShell.displayName = 'SignOutShell'
