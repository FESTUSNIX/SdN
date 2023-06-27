import { Toaster } from 'react-hot-toast'
import '@/app/styles/globals.css'
import { Inter } from 'next/font/google'
import Providers from '@/app/components/Providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
	title: 'SdN | Admin Panel'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en' className='dark' style={{ colorScheme: 'dark' }}>
			<body className={inter.className}>
				<Providers>
					{children}
					<Toaster />
				</Providers>
			</body>
		</html>
	)
}
