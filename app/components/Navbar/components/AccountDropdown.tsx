import { Heart, LayoutDashboardIcon, LogIn, LogOut, Mail, Settings } from 'lucide-react'

import { SignOutShell } from '@/app/components/SignOutShell'
import UserAvatar from '@/app/components/UserAvatar'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '@/app/components/ui/DropdownMenu'
import { getAuthSession } from '@/lib/auth/auth'
import prisma from '@/prisma/client'
import Link from 'next/link'

type Props = {}

const AccountDropdown = async (props: Props) => {
	const session = await getAuthSession()
	const user = session?.user

	const userSubscriptions = await prisma.user.findFirst({
		where: {
			id: session?.user.id
		},
		select: {
			unit: {
				select: {
					subscriptions: {
						where: {
							to: {
								gte: new Date()
							},
							type: { in: ['PREMIUM', 'STANDARD'] }
						}
					}
				}
			}
		}
	})
	const subscriptions = userSubscriptions?.unit?.subscriptions

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<UserAvatar
					user={{ image: session?.user.image ?? null, name: session?.user.name ?? null }}
					className='cursor-pointer border duration-300 hover:shadow'
				/>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end' className='min-w-56'>
				<DropdownMenuGroup>
					{user ? (
						<DropdownMenuItem asChild>
							<Link href={'/account'} className='flex items-center gap-2'>
								<UserAvatar
									user={{ image: session?.user.image ?? null, name: session?.user.name ?? null }}
									className='border'
								/>
								<div>
									<p className='max-w-48 truncate leading-tight'>{user.name}</p>
									<p className='max-w-48 truncate text-xs text-muted-foreground'>{user.email}</p>
								</div>
							</Link>
						</DropdownMenuItem>
					) : (
						<DropdownMenuItem asChild>
							<Link href={'/login'}>
								<LogIn className='mr-2 h-4 w-4' />
								<span>Zaloguj się</span>
							</Link>
						</DropdownMenuItem>
					)}
					{user?.role === 'UNIT' && subscriptions && subscriptions.length > 0 && (
						<>
							<DropdownMenuSeparator />
							<DropdownMenuItem asChild>
								<Link href={'/manage'}>
									<Settings className='mr-2 h-4 w-4' />
									<span>Zarządzaj jednostką</span>
								</Link>
							</DropdownMenuItem>
						</>
					)}
					{user?.role === 'ADMIN' && (
						<>
							<DropdownMenuSeparator />
							<DropdownMenuItem asChild>
								<Link href={'/admin'}>
									<LayoutDashboardIcon className='mr-2 h-4 w-4' />
									<span>Panel zarządzania</span>
								</Link>
							</DropdownMenuItem>
						</>
					)}
				</DropdownMenuGroup>

				<>
					<DropdownMenuSeparator />

					<DropdownMenuGroup>
						<DropdownMenuItem asChild>
							<Link href={'/saved'}>
								<Heart className='mr-2 h-4 w-4' />
								<span>Polubione</span>
							</Link>
						</DropdownMenuItem>
					</DropdownMenuGroup>
				</>

				<DropdownMenuSeparator />

				<DropdownMenuGroup>
					<DropdownMenuItem asChild>
						<Link href={'/contact'}>
							<Mail className='mr-2 h-4 w-4' />
							<span>Kontakt</span>
						</Link>
					</DropdownMenuItem>

					{user && (
						<DropdownMenuItem asChild>
							<SignOutShell>
								<button className='w-full'>
									<LogOut className='mr-2 h-4 w-4' />
									<span>Wyloguj się</span>
								</button>
							</SignOutShell>
						</DropdownMenuItem>
					)}
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export default AccountDropdown
