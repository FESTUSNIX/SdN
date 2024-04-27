'use client'

import { Button, ButtonProps } from '@/app/components/ui/Button'
import { cn, getLocalStorage, setLocalStorage } from '@/lib/utils/utils'
import { HeartIcon } from 'lucide-react'
import { useEffect, useState } from 'react'

type Props = {
	majorSlug: string
	className?: string
	label?: {
		liked: string
		disliked: string
	}
	onDislike?: (slug: string) => void
} & ButtonProps &
	React.HTMLAttributes<HTMLButtonElement>

export const LikeButton = ({ majorSlug, className, asChild, label, onDislike, ...props }: Props) => {
	const [isLiked, setIsLiked] = useState(false)

	const handleLike = () => {
		if (!localStorage || typeof window === 'undefined') return

		const likedMajors = getLocalStorage('likedMajors', [])

		if (likedMajors.includes(majorSlug)) {
			setLocalStorage(
				'likedMajors',
				likedMajors.filter((slug: string) => slug !== majorSlug)
			)
			setIsLiked(false)
			onDislike && onDislike(majorSlug)
		} else {
			setLocalStorage('likedMajors', [...likedMajors, majorSlug])
			setIsLiked(true)
		}
	}

	useEffect(() => {
		setIsLiked(getLocalStorage('likedMajors', []).includes(majorSlug))
	}, [majorSlug])

	return (
		<Button
			{...props}
			size={label ? 'sm' : 'icon'}
			variant={label ? 'ghost' : 'secondary'}
			className={cn(
				'flex items-center gap-2 transition-all duration-150 active:scale-95',
				isLiked && 'bg-background !opacity-100',
				label && 'underline',
				className
			)}
			onClick={e => {
				e.preventDefault()
				handleLike()
			}}>
			<HeartIcon className={cn('size-4', isLiked && 'fill-[#e2264d] text-[#e2264d]')} />
			{label ? (
				<span>{isLiked ? label.liked : label.disliked}</span>
			) : (
				<span className='sr-only'>Zapisz do ulubionych</span>
			)}
		</Button>
	)
}
