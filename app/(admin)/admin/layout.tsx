import { Toaster } from 'react-hot-toast'
import '@/app/styles/globals.css'
import { Inter } from 'next/font/google'
import Providers from '@/app/components/Providers'
import Sidebar from './components/Sidebar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
	title: 'SdN | Admin Panel'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en' className='dark' style={{ colorScheme: 'dark' }}>
			<body className={inter.className}>
				<Providers>
					<div className='flex'>
						<Sidebar />
						<div className='h-full w-full flex-1'>{children}</div>
					</div>
					<Toaster />
				</Providers>
			</body>
		</html>
	)
}
