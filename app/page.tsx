import Image from 'next/image'
import Units from './components/modules/Units'

export default function Home() {
	return (
		<main className='flex min-h-screen flex-col items-center wrapper pt-12'>
			<h1 className='text-4xl font-black text-emerald-500'>SdN</h1>

			<Units />
		</main>
	)
}
