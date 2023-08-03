import { Toaster } from 'react-hot-toast'
import '../styles/globals.css'
import { Inter } from 'next/font/google'
import Providers from '@/app/components/Providers'
import Navbar from './components/Navbar'
import { cn } from '@/lib/utils/utils'
import Footer from './components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
	title: 'Studia dla Nauczycieli',
	description: 'Wyszukiwarka studiów dla nauczycieli'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en' suppressHydrationWarning>
			<body className={cn(inter.className, 'flex h-full flex-col')}>
				<Providers>
					<Navbar />
					{children}
					<Footer />
					<Toaster />
				</Providers>
			</body>
		</html>
	)
}
