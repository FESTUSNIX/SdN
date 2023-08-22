import './styles/globals.css'
import { cn } from '@/lib/utils/utils'
import { Metadata } from 'next'
import { Toaster } from 'react-hot-toast'
import Providers from './components/Providers'
import Sidebar from './components/Sidebar'
import { Outfit } from 'next/font/google'

const outfit = Outfit({ subsets: ['latin-ext'] })

export const metadata: Metadata = {
	title: {
		template: '%s | SdN Admin',
		default: 'Admin'
	}
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en' suppressHydrationWarning>
			<body className={cn(outfit.className, 'md:overflow-hidden')}>
				<Providers>
					<div className='flex flex-col md:flex-row'>
						<Sidebar />
						<div className='max-md:h-[73px]'></div>
						{children}
					</div>
					<Toaster />
				</Providers>
			</body>
		</html>
	)
}
