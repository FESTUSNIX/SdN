import Link from 'next/link'
import { buttonVariants } from '../components/ui/button'
import { cn } from '@/lib/utils'

export default function NotFound() {
	return (
		<div className='wrapper my-12 flex grow flex-col items-center justify-center md:my-24'>
			<h1 className='mb-4 text-8xl font-black md:text-9xl'>404</h1>
			<h2 className='text-center text-5xl font-bold md:text-6xl'>Strona nie odnaleziona</h2>
			<p className='mt-2 text-center text-xl'>Nie udało się znaleźć żądanego zasobu</p>

			<div className='mt-12 flex w-full flex-col items-center gap-2 sm:flex-row sm:justify-center'>
				<Link href='/contact' className={cn(buttonVariants({ size: 'lg', variant: 'secondary' }), 'max-sm:w-full')}>
					Skontaktuj się z nami
				</Link>
				<Link href='/' className={cn(buttonVariants({ size: 'lg' }), 'max-sm:w-full')}>
					Strona główna
				</Link>
			</div>
		</div>
	)
}
