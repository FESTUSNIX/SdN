import { cn } from '@/lib/utils/utils'
import Logo from '@/public/sdn-logo@svg.svg'
import Banner from '@/public/sdn-logotyp@svg.svg'
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
