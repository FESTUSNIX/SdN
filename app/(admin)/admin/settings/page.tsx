import ChangePassword from '@/app/(main)/(manage)/manage/components/ChangePassword'
import { H1 } from '@/app/components/ui/Typography'
import { getAuthSession } from '@/lib/auth/auth'

export default async function AdminSettingsPage() {
	const session = await getAuthSession()

	if (!session?.user) return null

	return (
		<div className='wrapper flex min-h-screen flex-1 flex-col pt-12'>
			<H1 className='mb-8'>Settings</H1>

			<ChangePassword className='w-max' />
		</div>
	)
}
