import Image from 'next/image'
import Units from './components/modules/Units'
import { H1 } from './components/elements/Typography'

export default function Home() {
	return (
		<main className='flex min-h-screen flex-col items-center wrapper pt-12'>
			<H1>Studia dla Nauczycieli</H1>

			<Units />
		</main>
	)
}
