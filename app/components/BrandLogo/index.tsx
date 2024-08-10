import { cn } from '@/lib/utils'
import Logo from '@/public/assets/logo.svg'
import Banner from '@/public/assets/wordmark-horizontal.svg'
import Image from 'next/image'

export const BrandLogo = ({
	className,
	width = 200,
	height = 50,
	type = 'logo'
}: {
	className?: string
	size?: number
	width?: number
	height?: number
	type?: 'logo' | 'banner'
}) => {
	return (
		<Image
			src={type === 'logo' ? Logo : Banner}
			alt='Logo SdN'
			width={width}
			height={height}
			className={cn('h-9 w-auto', className)}
		/>
	)
}
