import Image from 'next/image'
import Units from './components/modules/Units'
import { H1 } from '@/app/components/ui/Typography'
import { Suspense } from 'react'

export default function Home() {
	return (
		<div className='flex min-h-screen flex-col items-center wrapper pt-12'>
			<H1>Studia dla Nauczycieli</H1>
		
			<Suspense fallback={<div>Loading units...</div>}>
				<Units />
			</Suspense>
		</div>
	)
}
