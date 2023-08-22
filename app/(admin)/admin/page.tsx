import { H1, H2 } from '@/app/components/ui/Typography'
import { getAuthSession } from '@/lib/auth/auth'

export default async function AdminPage() {
	const session = await getAuthSession()

	return (
		<div className='wrapper flex min-h-screen flex-1 flex-col pt-12'>
			<H1 className='mb-6'>Dashboard</H1>
			<H2 className='mb-24'>Welcome {session?.user.name ?? session?.user.email} !</H2>
		</div>
	)
}
