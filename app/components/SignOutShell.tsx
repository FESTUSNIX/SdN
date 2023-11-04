'use client'

import { Slot, SlotProps } from '@radix-ui/react-slot'
import { SignOutParams, signOut } from 'next-auth/react'

type Props = SlotProps &
	React.RefAttributes<HTMLElement> & {
		signOutOptions?: SignOutParams<true> | undefined
	}

export const SignOutShell = ({ onClick, signOutOptions, ...props }: Props) => {
	return (
		<Slot
			{...props}
			onClick={e => {
				onClick && onClick(e)

				signOut(signOutOptions)
			}}
		/>
	)
}
