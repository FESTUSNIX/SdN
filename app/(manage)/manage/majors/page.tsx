import { getAuthSession } from '@/lib/auth/auth'
import { redirect } from 'next/navigation'

export default async function ManageMajorsPage() {
	const session = await getAuthSession()
	if (!session) redirect('/login')

	return <div className='wrapper flex min-h-screen flex-1 flex-col pt-12'></div>
}
