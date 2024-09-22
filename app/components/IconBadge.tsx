import Link from 'next/link'
import React from 'react'

type Props = {
	href: string
	Icon: React.ElementType
	name: string
}

const IconBadge = ({ href, Icon, name }: Props) => {
	return (
		<Link href={href} target='_blank' className='rounded-full border p-2 duration-300 hover:border-muted-foreground'>
			<span className='sr-only'>{name}</span>
			<Icon className='h-5 w-5 text-muted-foreground' />
		</Link>
	)
}

export default IconBadge
