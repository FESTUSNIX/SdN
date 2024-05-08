'use client'

import { cn } from '@/lib/utils/utils'
import React, { useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive'

type Props = {
	children: React.ReactNode
}

export const MobileNavShell = ({ children }: Props) => {
	const mdBreakpoint = useMediaQuery({ minWidth: 768 })
	const [isMD, setIsMD] = useState(false)

	const [show, setShow] = useState(true)
	const [lastScrollY, setLastScrollY] = useState(0)
	const [changeBoundary, setChangeBoundary] = useState<{
		direction: 'up' | 'down'
		lastDirectionChange: number
	}>({
		direction: 'down',
		lastDirectionChange: 0
	})

	const topBoundary = 120
	const bottomBoundary = 120

	const controlNavbar = () => {
		if (typeof window !== 'undefined') {
			if (window.scrollY > lastScrollY) {
				// On scroll down

				if (changeBoundary.direction === 'up') {
					setChangeBoundary({
						direction: 'down',
						lastDirectionChange: lastScrollY
					})
				}

				setShow(
					!(changeBoundary.direction === 'down' && changeBoundary.lastDirectionChange + bottomBoundary < window.scrollY)
				)
			} else {
				// On scroll up

				if (changeBoundary.direction === 'down') {
					setChangeBoundary({
						direction: 'up',
						lastDirectionChange: lastScrollY
					})
				}

				setShow(changeBoundary.direction === 'up' && changeBoundary.lastDirectionChange - topBoundary > window.scrollY)
			}

			setLastScrollY(window.scrollY)
		}
	}

	useEffect(() => {
		if (typeof window !== 'undefined') {
			window.addEventListener('scroll', controlNavbar)

			return () => {
				window.removeEventListener('scroll', controlNavbar)
			}
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [lastScrollY])

	useEffect(() => {
		// Making sure that component has mounted, otherwise causes hydration error
		setIsMD(mdBreakpoint)
	}, [mdBreakpoint])

	if (isMD) return null

	return (
		<>
			<div
				className={cn(
					'fixed bottom-0 z-50 w-full duration-300 ease-in-out',
					show ? 'translate-y-0' : 'translate-y-full'
				)}>
				{children}
			</div>
		</>
	)
}
