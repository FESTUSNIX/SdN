import Providers from '@/app/components/Providers'
import '@/app/styles/globals.css'
import { cn } from '@/lib/utils/utils'
import { Metadata } from 'next'
import { Outfit } from 'next/font/google'
import { Toaster } from 'react-hot-toast'

const outfit = Outfit({ subsets: ['latin-ext'] })

export const metadata: Metadata = {
	title: {
		default: 'Uwierzytelnianie | Studia Dla Nauczycieli',
		template: '%s | Studia Dla Nauczycieli'
	}
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {

	return (
		<html lang='en' suppressHydrationWarning>
			<body className={cn(outfit.className, 'flex flex-col')}>
				<Providers>
					{children}
					<Toaster />
				</Providers>
			</body>
		</html>
	)
}
