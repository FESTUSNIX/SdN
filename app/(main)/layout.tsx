import Providers from '@/app/components/Providers'
import { cn } from '@/lib/utils/utils'
import { Outfit } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import Navbar from './components/Navbar'
import SimplifiedFooter from './components/SimplifiedFooter'
import './styles/globals.css'

const outfit = Outfit({ subsets: ['latin-ext'] })

export const metadata = {
	title: 'Studia dla Nauczycieli',
	description: 'Wyszukiwarka studiów dla nauczycieli'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en' suppressHydrationWarning>
			<body className={cn(outfit.className, 'flex h-full flex-col')}>
				<Providers>
					<Navbar />
					{children}
					<SimplifiedFooter />
					<Toaster />
				</Providers>
			</body>
		</html>
	)
}
