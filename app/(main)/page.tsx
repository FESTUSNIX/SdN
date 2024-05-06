import { Metadata } from 'next'
import { Attributes } from './components/sections/Attributes'
import { Hero } from './components/sections/Hero'
import { OurStats } from './components/sections/OurStats'

export const metadata: Metadata = {
	title: {
		absolute: 'Studia dla Nauczycieli'
	}
}

export default function Home() {
	return (
		<main className='relative flex grow flex-col overflow-hidden'>
			<Hero />

			<OurStats />

			<Attributes />
		</main>
	)
}
