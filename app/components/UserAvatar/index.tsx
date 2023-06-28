import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/ui/Avatar'
import { AvatarProps } from '@radix-ui/react-avatar'
import { Icons } from '../Icons'
import { User } from '@prisma/client'

type Props = {
	user: Pick<User, 'name' | 'image'>
} & AvatarProps

const UserAvatar = ({ user, ...props }: Props) => {
	return (
		<Avatar {...props}>
			{user.image ? (
				<AvatarImage
					src={user.image}
					alt={`${user.name}'s profile picture`}
					referrerPolicy='no-referrer'
					className='relative aspect-square h-full w-full'
				/>
			) : (
				<AvatarFallback>
					<span className='sr-only'>{user.name}</span>
					<Icons.user className='h-4 w-4' />
				</AvatarFallback>
			)}
		</Avatar>
	)
}

export default UserAvatar
