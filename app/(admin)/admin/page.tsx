import { Button } from '@/app/components/ui/Button'
import { H1, H2 } from '@/app/components/ui/Typography'
import { getAuthSession } from '@/lib/auth/auth'
import Link from 'next/link'
import Confetti from './components/Confetti'

export const metadata = {
	title: 'Dashboard'
}

export default async function AdminPage() {
	const session = await getAuthSession()

	return (
		<div className='wrapper flex min-h-screen flex-1 flex-col pt-12'>
			<H1 className='mb-6'>Dashboard</H1>
			<H2 className='mb-24'>Welcome {session?.user.name ?? session?.user.email} !</H2>

			<section className='mb-12 w-full'>
				<Button asChild variant={'link'}>
					<Link href={'/admin/units'}>Manage units</Link>
				</Button>
			</section>

			<div className='py-6'>
				<Confetti />
			</div>
		</div>
	)
}
