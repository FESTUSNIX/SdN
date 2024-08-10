'use client'

import React from 'react'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '@/app/components/ui/DropdownMenu'
import UserAvatar from '@/app/components/UserAvatar'
import Link from 'next/link'
import { signOut } from 'next-auth/react'
import { LogOut } from 'lucide-react'
import { Settings } from 'lucide-react'
import { User } from 'next-auth'

type Props = {
	user: Pick<User, 'name' | 'image' | 'email'>
	triggerClassName?: string
}

const UserAccountNav = ({ user, triggerClassName }: Props) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger className={triggerClassName}>
				<UserAvatar
					className='h-8 w-8'
					user={{
						name: user.name || null,
						image: user.image || null
					}}
				/>
			</DropdownMenuTrigger>

			<DropdownMenuContent align='end' side='right'>
				<div className='flex items-center justify-start gap-2 p-2'>
					<div className='flex flex-col space-y-1 leading-none'>
						{user.name && <p className='font-medium'>{user.name}</p>}
						{user.email && <p className='w-[200px] truncate text-sm text-muted-foreground'>{user.email}</p>}
					</div>
				</div>

				<DropdownMenuSeparator />

				<DropdownMenuItem asChild>
					<Link href={'/admin/settings'}>
						<Settings className='mr-2 h-3.5 w-3.5 text-muted-foreground/70' />
						Settings
					</Link>
				</DropdownMenuItem>

				<DropdownMenuSeparator />

				<DropdownMenuItem
					onSelect={event => {
						event.preventDefault()

						signOut({ callbackUrl: `${window.location.origin}/login` })
					}}
					className='cursor-pointer hover:!bg-destructive hover:!text-destructive-foreground'>
					<LogOut className='mr-2 h-3.5 w-3.5 text-muted-foreground/70' />
					Sign out
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export default UserAccountNav
