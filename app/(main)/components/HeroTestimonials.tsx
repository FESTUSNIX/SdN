import { cn } from '@/lib/utils/utils'
import Image from 'next/image'

type Props = {
	className?: string
}

const EMOJI = ['🧬', '💻', '📖']

export const HeroTestimonials = ({ className }: Props) => {
	return (
		<div className={cn('flex items-center gap-2', className)}>
			{Array(3)
				.fill(0)
				.map((_, i) => (
					<div key={i} className='relative'>
						<Image
							src={`/images/decoration/person-${i + 1}.webp`}
							alt=''
							width={60}
							height={60}
							className='pointer-events-none size-8 rounded-lg shadow-[2.5px_2.5px_0px_hsl(var(--alternative))] sm:size-9 md:size-10 lg:size-11 xl:size-12'
						/>

						<span className='absolute -right-1.5 -top-1.5 z-10 rounded-sm bg-secondary p-0.5 text-[10px] md:text-xs xl:-right-2 xl:-top-2 xl:text-sm'>
							{EMOJI[i]}
						</span>
					</div>
				))}
		</div>
	)
}
