import Link from 'next/link'
import { Button } from '../components/elements/Button'
import { H1 } from '../components/elements/Typography'

export default function AdminPage() {
	return (
		<main className='flex min-h-screen flex-col items-center wrapper pt-12'>
			<H1 className='mb-24'>Admin Panel</H1>

			<section className='w-full mb-12'>
				<Button asChild variant={'link'}>
					<Link href={'/admin/units'}>Manage units</Link>
				</Button>
			</section>
		</main>
	)
}
