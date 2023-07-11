import '@/app/styles/globals.css'
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
		<html lang='en'>
			<body className={cn(inter.className, 'overflow-hidden')}>
				<Providers>
					<div className='flex'>
						<Sidebar />
						<div className='h-screen max-h-screen w-full flex-1 overflow-y-auto'>{children}</div>
					</div>
					<Toaster />
				</Providers>
			</body>
		</html>
	)
}
