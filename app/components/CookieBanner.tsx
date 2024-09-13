'use client'

import { cn, getLocalStorage, setLocalStorage } from '@/lib/utils'
import { AnimatePresence, motion } from 'framer-motion'
import { CookieIcon } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Button } from './ui/button'

type Props = {}

const variants = {
	hidden: { opacity: 0, y: 100 },
	visible: { opacity: 1, y: 0 },
	exit: { opacity: 0, y: 100 }
}

export const CookieBanner = (props: Props) => {
	const [cookieConsent, setCookieConsent] = useState(false)

	useEffect(() => {
		const storedCookieConsent = getLocalStorage('cookie_consent', null)

		setCookieConsent(storedCookieConsent)
	}, [])

	useEffect(() => {
		const newValue = cookieConsent ? 'granted' : 'denied'

		if (window && window.gtag) {
			window.gtag('consent', 'update', {
				analytics_storage: newValue
			})
		}
	}, [cookieConsent])

	const acceptCookie = () => {
		setCookieConsent(true)
		setLocalStorage('cookie_consent', true)
	}

	const declineCookie = () => {
		setCookieConsent(false)
		setLocalStorage('cookie_consent', false)
	}

	return (
		<AnimatePresence mode='wait'>
			{cookieConsent === null && (
				<motion.div
					initial='hidden'
					animate='visible'
					exit='exit'
					variants={variants}
					key={'cookieBanner'}
					className='grid-container pointer-events-none fixed bottom-0 left-0 right-0 z-50 mx-auto my-4'>
					<div
						className={cn(
							'pointer-events-auto mx-auto flex max-w-max flex-col items-center justify-between gap-x-8 gap-y-6 rounded-3xl border border-border bg-secondary py-2.5 pl-4 pr-2.5 shadow-md sm:flex-row sm:rounded-full md:max-w-screen-md lg:gap-x-16'
						)}>
						<div className='flex items-center gap-4'>
							<CookieIcon className='size-5' />
							<p className='text-center text-secondary-foreground sm:text-start'>
								Nasza strona używa{' '}
								<Link href='/privacy-policy#cookies' className='underline'>
									plików cookies.
								</Link>
							</p>
						</div>

						<div className='flex shrink-0 flex-wrap gap-2'>
							<Button className='grow' size={'sm'} variant={'ghost'} onClick={() => declineCookie()}>
								Odrzuć
							</Button>
							<Button className='grow rounded-full px-4' size={'sm'} onClick={() => acceptCookie()}>
								Akceptuj ciasteczka
							</Button>
						</div>
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	)
}
