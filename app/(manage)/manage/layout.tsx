import Navbar from '@/app/(main)/components/Navbar'
import Providers from '@/app/components/Providers'
import { Separator } from '@/app/components/ui/Separator/separator'
import { getAuthSession } from '@/lib/auth/auth'
import { Metadata } from 'next'
import { Outfit } from 'next/font/google'
import { redirect } from 'next/navigation'
import { Toaster } from 'react-hot-toast'
import SidebarNav from './components/SidebarNav'
import './styles/globals.css'

const outfit = Outfit({ subsets: ['latin-ext'] })

export const metadata: Metadata = {
	title: {
		default: 'Zarządzaj uczelnią | Studia Dla Nauczycieli',
		template: '%s | Studia Dla Nauczycieli'
	}
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	const session = await getAuthSession()
	if (!session) redirect('/login')

	return (
		<html lang='en' suppressHydrationWarning>
			<body className={outfit.className}>
				<Providers>
					<Navbar />

					<div className='flex min-h-screen flex-col'>
						<div className='h-20 md:h-[72px]' />
						<Separator />

						<div className='container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10'>
							<aside className='h-full md:border-r md:px-4'>
								<div className='py-8 md:sticky md:bottom-0 md:top-navOffset'>
									<SidebarNav />
								</div>
							</aside>
							<main className='flex w-full flex-col overflow-hidden pt-8'>{children}</main>
						</div>
					</div>

					<Toaster />
				</Providers>
			</body>
		</html>
	)
}
