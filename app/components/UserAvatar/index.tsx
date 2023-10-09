import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/ui/Avatar'
import { User } from '@prisma/client'
import { AvatarProps } from '@radix-ui/react-avatar'
import { UserIcon } from 'lucide-react'

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
					<UserIcon className='h-4 w-4' />
				</AvatarFallback>
			)}
		</Avatar>
	)
}

export default UserAvatar
