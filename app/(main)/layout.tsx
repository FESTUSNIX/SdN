import { MobileNav } from '@/app/components/MobileNav'
import Providers from '@/app/components/Providers'
import '@/app/styles/globals.css'
import { cn } from '@/lib/utils/utils'
import { Outfit } from 'next/font/google'
import { Suspense } from 'react'
import { Toaster } from 'react-hot-toast'
import Navbar from './components/Navbar'
import SimplifiedFooter from './components/SimplifiedFooter'

const outfit = Outfit({ subsets: ['latin-ext'] })

export const metadata = {
	title: {
		template: '%s | Studia dla Nauczycieli',
		default: 'Studia dla Nauczycieli'
	}
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en' suppressHydrationWarning>
			<body className={cn(outfit.className, 'flex flex-col')}>
				<Providers>
					<Suspense>
						<Navbar />
					</Suspense>
					<div className='pointer-events-none h-navOffset select-none'></div>

					{children}

					<SimplifiedFooter />

					<Suspense>
						<MobileNav />
					</Suspense>

					<Toaster />
				</Providers>
			</body>
		</html>
	)
}
