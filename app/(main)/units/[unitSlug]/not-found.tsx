import { buttonVariants } from '@/app/components/ui/Button'
import { H1 } from '@/app/components/ui/Typography'
import Link from 'next/link'

export default function NotFound() {
	return (
		<div className='flex flex-col items-center py-24'>
			<H1>Not Found</H1>
			<p className='mb-12 mt-4 text-lg'>Could not find requested resource</p>
			<Link href='/' className={buttonVariants({ variant: 'default' })}>
				Return Home
			</Link>
		</div>
	)
}
