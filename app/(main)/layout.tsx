import { MobileNav } from '@/app/components/MobileNav'
import Navbar from '@/app/components/Navbar'
import Providers from '@/app/components/Providers'
import '@/app/styles/globals.css'
import { cn } from '@/lib/utils'
import { Outfit } from 'next/font/google'
import localFont from 'next/font/local'
import { Suspense } from 'react'
import { Toaster } from 'react-hot-toast'
import Footer from '../components/Footer'
import { siteConfig } from '@/config/site'
import { Metadata, Viewport } from 'next'
import GoogleAnalytics from '../components/GoogleAnalytics'
import { CookieBanner } from '../components/CookieBanner'

const body = Outfit({ subsets: ['latin-ext'], variable: '--font-body' })
const heading = localFont({
	src: '../../public/fonts/Chillax-Variable.ttf',
	variable: '--font-heading',
	display: 'swap'
})

export const metadata: Metadata = {
	title: {
		default: siteConfig.name,
		template: `%s | ${siteConfig.name}`
	},
	metadataBase: new URL(siteConfig.url),
	description:
		'Znajdź idealne studia dla nauczycieli! Porównaj oferty uczelni, kierunki, formy kształcenia i wymagania rekrutacyjne. Odkryj najlepsze opcje edukacyjne i rozwijaj swoją karierę nauczycielską.',
	keywords: siteConfig.keywords,
	openGraph: {
		title: 'Studia dla Nauczycieli',
		description: siteConfig.description,
		url: siteConfig.url,
		type: 'website',
		locale: 'pl'
	},
	twitter: {
		title: 'Studia dla Nauczycieli',
		description: siteConfig.description,
		card: 'summary_large_image',
		images: [`${siteConfig.url}/opengraph-image.jpg`]
	}
}

export const viewport: Viewport = {
	colorScheme: 'dark light',
	themeColor: [
		{ media: '(prefers-color-scheme: light)', color: '#3361cc' },
		{ media: '(prefers-color-scheme: dark)', color: '#3361cc' }
	]
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='pl' suppressHydrationWarning>
			{process.env.NEXT_PUBLIC_GA_MEASURMENT_ID ? (
				<Suspense>
					<GoogleAnalytics GA_MEASUREMENT_ID={process.env.NEXT_PUBLIC_GA_MEASURMENT_ID} />
				</Suspense>
			) : null}

			<body className={cn(`${body.variable} ${heading.variable}`, 'flex flex-col')}>
				<Providers>
					<Suspense>
						<CookieBanner />
					</Suspense>

					<Suspense>
						<Navbar />
					</Suspense>
					<div className='pointer-events-none h-navOffset select-none'></div>

					{children}

					<Suspense>
						<Footer />
					</Suspense>

					<Suspense>
						<MobileNav />
					</Suspense>

					<Toaster />
				</Providers>
			</body>
		</html>
	)
}
