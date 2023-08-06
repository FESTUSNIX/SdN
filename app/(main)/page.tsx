import EmailForm from './components/EmailForm'

export default function Home() {
	return (
		<main className='grow'>
			<header className='wrapper flex h-full flex-col items-center justify-center py-24'>
				<div className='flex flex-col items-center text-center'>
					<h1 className='max-w-3xl text-center text-4xl font-black uppercase sm:text-6xl md:text-7xl xl:text-8xl [@media(min-width:350px)]:max-sm:text-5xl'>
						niedługo startujemy
					</h1>
					<h2 className='mb-12 mt-6 max-w-xl text-lg text-muted-foreground md:mb-16 md:mt-8 md:text-2xl'>
						Znalezienie idealnych studiów - jeszcze prostsze, jeszcze skuteczniejsze, już niebawem!
					</h2>

					<div className='w-full max-w-full sm:max-w-lg  lg:max-w-xl'>
						<EmailForm />
					</div>
				</div>
			</header>
		</main>
	)
}
