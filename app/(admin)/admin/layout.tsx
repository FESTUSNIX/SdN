import { Toaster } from 'react-hot-toast'
import '@/app/styles/globals.css'
import { Inter } from 'next/font/google'
import Providers from './components/Providers'
import Sidebar from './components/Sidebar'
import { cn } from '@/lib/utils/utils'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
	title: 'SdN | Admin Panel'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en' className='dark' style={{ colorScheme: 'dark' }}>
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
