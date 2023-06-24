import Link from 'next/link'
import { Button } from '@/app/components/ui/Button'
import { H1 } from '@/app/components/ui/Typography'

export default function AdminPage() {
	return (
		<div className='flex min-h-screen flex-col items-center wrapper pt-12'>
			<H1 className='mb-24'>Admin Panel</H1>

			<section className='w-full mb-12'>
				<Button asChild variant={'link'}>
					<Link href={'/admin/units'}>Manage units</Link>
				</Button>
			</section>
		</div>
	)
}
