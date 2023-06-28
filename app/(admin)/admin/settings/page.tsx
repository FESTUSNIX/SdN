import { H1 } from '@/app/components/ui/Typography'
import { getAuthSession } from '@/lib/auth/auth'
import ResetPassword from './components/ResetPassword'

export default async function AdminSettingsPage() {
	const session = await getAuthSession()

	if (!session?.user) return null

	return (
		<div className='wrapper flex min-h-screen flex-1 flex-col pt-12'>
			<H1 className='mb-8'>Settings</H1>

			<ResetPassword
				user={{
					id: session?.user.id
				}}
			/>
		</div>
	)
}
