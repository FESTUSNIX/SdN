import {
    Heart,
    LogIn,
    LogOut,
    Mail,
    Settings,
    User
} from 'lucide-react'

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
import Link from 'next/link'

type Props = {}

const AccountDropdown = async (props: Props) => {
	const session = await getAuthSession()
	const user = session?.user

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<UserAvatar
					user={{ image: session?.user.image ?? null, name: session?.user.name ?? null }}
					className='cursor-pointer border duration-300 hover:shadow'
				/>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end' className='w-56'>
				<DropdownMenuGroup>
					{user ? (
						<DropdownMenuItem asChild>
							<Link href={'/account'}>
								<User className='mr-2 h-4 w-4' />
								<span>Konto</span>
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
					{user?.role === 'UNIT' && (
						<DropdownMenuItem asChild>
							<Link href={'/manage'}>
								<Settings className='mr-2 h-4 w-4' />
								<span>Zarządzaj jednostką</span>
							</Link>
						</DropdownMenuItem>
					)}
				</DropdownMenuGroup>

				{user && (
					<>
						<DropdownMenuSeparator />

						<DropdownMenuGroup>
							<DropdownMenuItem asChild>
								<Link href={'/liked'}>
									<Heart className='mr-2 h-4 w-4' />
									<span>Polubione</span>
								</Link>
							</DropdownMenuItem>
						</DropdownMenuGroup>
					</>
				)}

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
