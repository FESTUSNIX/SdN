import { getAuthSession } from '@/lib/auth/auth'
import Link from 'next/link'
import NavLinks from './components/NavLinks'
import UserAccountNav from './components/UserAccountNav'

const Sidebar = async () => {
	const session = await getAuthSession()

	return (
		<nav className='flex h-screen shrink-0 flex-col items-center border-r border-border px-4 py-4'>
			<Link href='/'>
				<div className='text-xl font-black'>SdN</div>
			</Link>

			<NavLinks />

			<UserAccountNav
				triggerClassName='mt-auto'
				user={{
					email: session?.user.email,
					name: session?.user.name,
					image: session?.user.image
				}}
			/>
		</nav>
	)
}

export default Sidebar
