import Link from 'next/link'
import { Button } from '@/app/components/ui/Button'
import { H1 } from '@/app/components/ui/Typography'
import { getAuthSession } from '@/lib/auth/auth'

export default async function AdminPage() {
	const session = await getAuthSession()

	return (
		<div className='wrapper flex min-h-screen flex-col items-center pt-12'>
			<H1 className='mb-24'>Admin Panel</H1>

			<section className='mb-12 w-full'>
				<Button asChild variant={'link'}>
					<Link href={'/admin/units'}>Manage units</Link>
				</Button>
			</section>

			<p>{session?.user.name}</p>
			<p>{session?.user.email}</p>
		</div>
	)
}
