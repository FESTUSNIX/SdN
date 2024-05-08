import { ExtendedSearchBar } from '@/app/components/ExtendedSearchBar'
import Image from 'next/image'
import { HeroTestimonials } from '../HeroTestimonials'
import { Suspense } from 'react'

type Props = {}

export const Hero = (props: Props) => {
	return (
		<header className='wrapper relative z-0 flex h-full min-h-[calc(100vh-4.5rem)] grow flex-col justify-start py-12 lg:justify-center lg:py-24'>
			<div className='flex flex-col lg:mb-32'>
				<h1 className='sr-only'>Znajdź studia podyplomowe na które zasługujesz</h1>

				<p className='max-w-sm text-muted-foreground sm:text-lg lg:max-w-md lg:text-xl'>
					Szukaj już teraz spośród ponad <span className='font-semibold'>2600 kieruków</span> z terenu całej Polski
				</p>

				<div className='mt-16 lg:mt-24'>
					<Suspense>
						<ExtendedSearchBar />
					</Suspense>
				</div>

				<div className='-order-1 mb-6 max-w-5xl font-heading text-4xl font-semibold sm:text-5xl md:text-6xl xl:text-7xl'>
					<div className='flex flex-col-reverse gap-4 sm:flex-row sm:items-center md:gap-6 lg:gap-8'>
						<span aria-hidden className='leading-[1.15]'>
							Znajdź{' '}
						</span>
						<HeroTestimonials />
					</div>
					<span aria-hidden className='block leading-[1.15] text-primary'>
						studia podyplomowe{' '}
					</span>
					<span aria-hidden className='block leading-[1.15]'>
						na które zasługujesz
					</span>
				</div>
			</div>

			<div className='absolute -bottom-4 right-16 -z-10 hidden w-[340px] translate-x-1/2 md:block lg:right-28 lg:w-[500px]'>
				<Image
					src={'/images/main-hero-woman.png'}
					alt='Nauczycielka korzystająca z wyszukiwarki studiów podyplomowych'
					width={1000}
					height={1000}
					className='pointer-events-none'
				/>
			</div>

			<div
				aria-hidden
				className='pointer-events-none absolute -bottom-16 -right-8 -z-20 hidden w-[660px] translate-x-1/2 md:block lg:-right-12 lg:w-[900px]'>
				<svg viewBox='0 0 848 753' fill='none' xmlns='http://www.w3.org/2000/svg'>
					<path
						d='M157.72 380.951C163.75 359.046 179.709 338.818 199.62 327.841L777.296 9.34443C820.454 -14.4496 858.218 15.2669 845.147 62.7465L669.756 699.892C663.726 721.798 647.772 742.024 627.859 752.999L50.1851 753.002C-5.82216 753.003 -5.04866 752.998 7.46569 699.892L157.72 380.951Z'
						fill='#3361CC'
					/>
				</svg>
			</div>
		</header>
	)
}
