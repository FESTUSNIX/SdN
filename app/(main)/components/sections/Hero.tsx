import { ExtendedSearchBar } from '@/app/components/ExtendedSearchBar'
import Image from 'next/image'

type Props = {}

export const Hero = (props: Props) => {
	return (
		<header className='wrapper relative z-0 flex h-full min-h-[calc(100vh-4.5rem)] grow flex-col justify-center py-24'>
			<div className='mb-32 flex flex-col'>
				<h1 className='mb-6 max-w-5xl font-heading text-7xl font-semibold leading-none'>
					Znajdź <span className='text-primary'>studia podyplomowe</span> na które zasługujesz
				</h1>

				<p className='max-w-md text-xl text-muted-foreground'>
					Szukaj już teraz spośród ponad <span className='font-semibold'>2600 kieruków</span> z terenu całej Polski
				</p>

				<div className='mt-24'>
					<ExtendedSearchBar />
				</div>
			</div>

			<div className='absolute bottom-16 left-0 flex flex-wrap items-center gap-2 text-center'>
				<div className='flex items-center pl-3'>
					{Array(5)
						.fill(0)
						.map((_, i) => (
							<Image
								key={i}
								src={`/images/decoration/person-${i + 1}.jpg`}
								alt=''
								width={60}
								height={60}
								className='-ml-3 size-6 rounded-full border xl:size-7'
							/>
						))}
				</div>
				<p className='text-sm xl:text-base'>Pomogliśmy już ponad 700 nauczycielom</p>
			</div>

			<div className='absolute -bottom-4 right-32 z-10 w-[500px] translate-x-1/2'>
				<Image
					src={'/images/main-hero-woman.png'}
					alt='Nauczycielka korzystająca z wyszukiwarki studiów podyplomowych'
					width={1000}
					height={1000}
					className=''
				/>
			</div>

			<div className='absolute -bottom-16 right-0 w-[900px] translate-x-1/2'>
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
