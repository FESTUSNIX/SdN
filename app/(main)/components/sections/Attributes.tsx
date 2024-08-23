import { Button, buttonVariants } from '@/app/components/ui/button'
import { cn } from '@/lib/utils'
import { SearchIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Props = {}

export const Attributes = (props: Props) => {
	return (
		<section className='wrapper my-32 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-12 lg:grid-rows-2'>
			<GridItem className='relative bg-primary md:col-span-full lg:col-span-7'>
				<h3 className='z-10 max-w-md font-heading text-3xl font-semibold leading-tight text-primary-foreground lg:text-4xl'>
					<span className='inline-block'>Kilkudniowe poszukiwania...</span>
					<span className='inline-block'>skrócone do przerwy międzylekcyjnej</span>
				</h3>

				<div className='mb-4 mt-12 h-px w-[calc(100%+2rem)] bg-alternative duration-300 group-hover/item:translate-x-4' />

				<Image
					src={'/images/decoration/woman-time.webp'}
					alt='Kobieta sprawdzająca czas na zegarku'
					width={500}
					height={500}
					className='absolute -right-8 bottom-0 h-auto w-1/3 duration-300 group-hover/item:scale-105 lg:-right-16 lg:w-1/2 xl:-right-8'
				/>
			</GridItem>

			<GridItem className='space-y-4 md:col-span-full min-[900px]:col-span-1 lg:col-span-5 lg:space-y-6'>
				<h3 className='font-heading text-3xl font-semibold leading-tight lg:text-4xl'>
					Koniec z setkami otwartych stron
				</h3>
				<p className='max-w-md text-muted-foreground'>
					Nie musisz przeszukiwać setek stron internetowych - z nami znajdziesz wszystko w jednym miejscu, szybko i
					wygodnie!
				</p>
				<Link href={'/search'} className={cn(buttonVariants(), 'gap-3 rounded-full')}>
					<span className='text-base'>Szukaj teraz</span>
					<SearchIcon className='size-4' />
				</Link>
			</GridItem>

			<GridItem className='relative flex flex-col gap-12 !pl-0 sm:flex-row sm:items-center md:col-span-full min-[900px]:col-span-1 lg:col-span-full'>
				<div className='relative flex h-max flex-col sm:self-end min-[900px]:h-full'>
					<div className='absolute -top-6 left-0 z-0 h-40 w-full lg:-top-8'>
						<div className='relative'>
							<div className='absolute left-1/2 top-0 h-[2px] w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-primary to-transparent blur-sm' />
							<div className='absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-primary to-transparent' />
							<div className='absolute left-1/2 top-0 h-[5px] w-2/5 -translate-x-1/2 bg-gradient-to-r from-transparent via-alternative to-transparent blur-sm duration-300 group-hover/item:h-3 group-hover/item:w-3/5 group-hover/item:blur-md' />
							<div className='absolute left-1/2 top-0 h-px w-2/5 -translate-x-1/2 bg-gradient-to-r from-transparent via-alternative to-transparent' />

							<div className='absolute inset-0 h-full w-full bg-secondary [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,hsl(var(--secondary)))]'></div>
						</div>
					</div>

					<h3 className='z-10 mt-6 flex h-auto flex-col gap-2 pl-8 sm:mt-auto min-[900px]:max-lg:items-center min-[900px]:max-lg:text-center lg:gap-3'>
						<span className='text-balance text-base max-md:max-w-72 md:text-pretty md:text-lg lg:text-xl'>
							Przyspieszamy proces znalezienia studiów aż o
						</span>
						<span className='font-heading text-6xl font-bold leading-none text-primary sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem]'>
							1500%
						</span>
					</h3>
				</div>

				<div className='w-[calc(100%-2rem)] overflow-hidden rounded-3xl border border-alternative duration-300 max-sm:-mb-48 max-sm:ml-8 sm:absolute sm:-right-12 sm:top-1/3 sm:w-64 sm:group-hover/item:-translate-x-2 sm:group-hover/item:-translate-y-2 min-[900px]:max-lg:hidden lg:-right-36 lg:top-16 lg:w-[34rem] xl:-right-24'>
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
		<div className={cn('group/item w-full overflow-hidden rounded-3xl border bg-secondary p-6 lg:p-8', className)}>
			{children}
		</div>
	)
}
