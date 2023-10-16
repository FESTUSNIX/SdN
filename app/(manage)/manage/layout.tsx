import { cn } from '@/lib/utils/utils'
import { Metadata } from 'next'
import { Outfit } from 'next/font/google'
import './styles/globals.css'

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
				<div className='flex flex-col md:flex-row'>
					<div className='max-md:h-[73px]'></div>
					{children}
				</div>
			</body>
		</html>
	)
}
