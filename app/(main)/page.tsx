import { Metadata } from 'next'
import { BrandLogo } from '../components/BrandLogo'
import { DecorationShape } from '../components/BrandShapesDecorations'
import EmailForm from './components/EmailForm'

export const metadata: Metadata = {
	title: {
		absolute: 'Studia dla Nauczycieli'
	}
}

export default function Home() {
	return (
		<main className='relative flex grow flex-col'>
			<header className='wrapper relative flex h-full grow flex-col items-center justify-center py-24'>
				<div className='flex flex-col items-center text-center'>
					<h1 className='max-w-3xl text-center text-4xl font-black uppercase sm:text-6xl md:text-7xl xl:text-8xl [@media(min-width:350px)]:max-sm:text-5xl'>
						niedługo startujemy
					</h1>
					<h2 className='mb-12 mt-6 max-w-xl text-lg text-muted-foreground md:mb-16 md:mt-8 md:text-2xl'>
						Znajdowanie idealnych studiów - jeszcze prostsze, jeszcze skuteczniejsze, już niebawem!
					</h2>

					<div className='w-full max-w-full sm:max-w-lg  lg:max-w-xl'>
						<EmailForm />
					</div>
				</div>

				<BrandLogo className='absolute -z-10 h-full opacity-[0.03]' />
			</header>

			<DecorationShape
				size={200}
				type='triangle'
				className='absolute left-12 top-1/4 origin-center animate-spin-decoration-shape'
			/>
			<DecorationShape
				size={140}
				type='square'
				className='absolute right-0 top-0 origin-center animate-spin-decoration-shape'
			/>
			<DecorationShape
				size={160}
				type='circle'
				className='absolute -right-12 bottom-0 origin-center animate-spin-decoration-shape'
			/>
		</main>
	)
}
