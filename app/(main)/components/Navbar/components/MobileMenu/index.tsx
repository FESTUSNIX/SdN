'use client'

import React, { useEffect, useState } from 'react'
import HamburgerIcon from 'hamburger-react'
import { links } from '../../constants/links'
import Link from 'next/link'
import { useScrollBlock } from '@/app/hooks/useScrollBlock'
import { cn } from '@/lib/utils/utils'

export const MobileMenu = () => {
	const [isOpen, setIsOpen] = useState(false)
	const [blockScroll, allowScroll] = useScrollBlock()

	useEffect(() => {
		isOpen ? blockScroll() : allowScroll()
	}, [isOpen, blockScroll, allowScroll])

	return (
		<div className='md:hidden'>
			<div className='relative z-50 overflow-hidden'>
				<HamburgerIcon toggled={isOpen} toggle={setIsOpen} size={24} label='Show menu' rounded />
			</div>

			<div
				className={cn(
					'fixed inset-0 z-40 flex items-center justify-center bg-background duration-300',
					isOpen ? 'translate-x-0' : 'translate-x-full'
				)}>
				<ul className='flex flex-col items-center gap-8'>
					{[{ label: 'Główna', path: '/' }, ...links].map(({ label, path }, index) => (
						<li key={index} onClick={() => setIsOpen(false)}>
							<Link href={path} className='px-2 py-4 text-4xl active:underline'>
								{label}
							</Link>
						</li>
					))}
				</ul>
			</div>
		</div>
	)
}
