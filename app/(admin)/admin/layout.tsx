import './styles/globals.css'
import { cn } from '@/lib/utils/utils'
import { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import Providers from './components/Providers'
import Sidebar from './components/Sidebar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: {
		template: '%s | SdN Admin',
		default: 'Manage'
	}
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en' suppressHydrationWarning>
			<body className={cn(inter.className, 'md:overflow-hidden')}>
				<Providers>
					<div className='flex flex-col-reverse md:flex-row'>
						<Sidebar />
						<div className='w-full flex-1 overflow-y-auto max-md:mt-20 md:h-screen md:max-h-screen'>{children}</div>
					</div>
					<Toaster />
				</Providers>
			</body>
		</html>
	)
}
