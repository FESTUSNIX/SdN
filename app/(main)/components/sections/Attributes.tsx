import { Button } from '@/app/components/ui/Button'
import { SparklesCore } from '@/app/components/ui/sparkles'
import { cn } from '@/lib/utils/utils'
import { SearchIcon } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

type Props = {}

export const Attributes = (props: Props) => {
	return (
		<section className='wrapper my-32 grid grid-cols-12 grid-rows-2 gap-5'>
			<GridItem className='relative col-span-7 bg-primary'>
				<h3 className='max-w-md font-heading text-4xl font-semibold leading-tight text-primary-foreground'>
					<span className='inline-block'>Kilkudniowe poszukiwania...</span>
					<span className='inline-block'>skrócone do przerwy międzylekcyjnej</span>
				</h3>

				<div className='mb-4 mt-12 h-px w-[calc(100%+2rem)] bg-alternative duration-300 group-hover/item:translate-x-4' />

				<Image
					src={'/images/decoration/woman-time.webp'}
					alt='Kobieta sprawdzająca czas na zegarku'
					width={500}
					height={500}
					className='absolute -right-8 bottom-0 h-auto w-1/2 duration-300 group-hover/item:scale-105'
				/>
			</GridItem>

			<GridItem className='col-span-5 space-y-6'>
				<h3 className='font-heading text-4xl font-semibold leading-tight'>Koniec z setkami otwartych stron</h3>
				<p className='text-muted-foreground'>
					Nie musisz przeszukiwać setek stron internetowych - z nami znajdziesz wszystko w jednym miejscu, szybko i
					wygodnie!
				</p>
				<Button className='gap-3 rounded-full'>
					<span className='text-base'>Szukaj teraz</span>
					<SearchIcon className='size-4' />
				</Button>
			</GridItem>

			<GridItem className='relative col-span-full flex items-center gap-24 pl-0'>
				<div className='relative flex h-full flex-col self-end'>
					<div className='absolute -top-8 left-0 z-0 h-40 w-full'>
						<div className='relative'>
							<div className='absolute left-1/2 top-0 h-[2px] w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-primary to-transparent blur-sm' />
							<div className='absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-primary to-transparent' />
							<div className='absolute left-1/2 top-0 h-[5px] w-2/5 -translate-x-1/2 bg-gradient-to-r from-transparent via-alternative to-transparent blur-sm duration-300 group-hover/item:h-3 group-hover/item:w-3/5 group-hover/item:blur-md' />
							<div className='absolute left-1/2 top-0 h-px w-2/5 -translate-x-1/2 bg-gradient-to-r from-transparent via-alternative to-transparent' />

							<SparklesCore
								background='transparent'
								minSize={0.4}
								maxSize={1}
								particleDensity={400}
								className='h-full w-full'
								particleColor='#3361cc'
							/>

							<div className='absolute inset-0 h-full w-full bg-secondary [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,hsl(var(--secondary)))]'></div>
						</div>
					</div>

					<h3 className='z-10 mt-auto flex h-auto flex-col gap-3 pl-8'>
						<span className='text-xl'>Przyspieszamy proces znalezienia studiów aż o</span>
						<span className='font-heading text-[10rem] font-bold leading-none text-primary'>1500%</span>
					</h3>
				</div>

				<div className='absolute -right-16 top-16 w-[34rem] overflow-hidden rounded-3xl border border-alternative duration-300 group-hover/item:-translate-x-2 group-hover/item:-translate-y-2'>
					<Image
						src={'/images/decoration/search-screenshot.webp'}
						alt='Zdjęcie wyszukiwarki studiów'
						width={600}
						height={600}
						className='pointer-events-none select-none'
					/>
				</div>
			</GridItem>
		</section>
	)
}

type GridItemProps = {
	children: React.ReactNode
	className?: string
}

const GridItem = ({ children, className }: GridItemProps) => {
	return (
		<div className={cn('group/item overflow-hidden rounded-3xl border bg-secondary p-8', className)}>{children}</div>
	)
}
