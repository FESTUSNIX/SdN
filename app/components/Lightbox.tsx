'use client'

import { DialogContent } from '@radix-ui/react-dialog'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { ReactNode, createContext, useContext, useState } from 'react'
import { Dialog, DialogClose, DialogOverlay, DialogPortal } from '@/app/components/ui/Dialog'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface LightboxContextType {
	isOpen: boolean
	currentIndex: number
	images: { alt: string; url: string }[]
	setCurrentIndex: (index: number) => void
	openLightbox: (index: number) => void
	closeLightbox: () => void
}

const LightboxContext = createContext<LightboxContextType | undefined>(undefined)

type LightboxProps = {
	children: ReactNode
	images: { alt: string; url: string }[]
	showThumbnails?: boolean
}

export const Lightbox = ({ children, images, showThumbnails = true }: LightboxProps) => {
	const [isOpen, setIsOpen] = useState(false)
	const [currentIndex, setCurrentIndex] = useState<number>(0)

	const openLightbox = (index: number) => {
		setCurrentIndex(index)
		setIsOpen(true)
	}

	const closeLightbox = () => {
		setCurrentIndex(0)
		setIsOpen(false)
	}

	return (
		<LightboxContext.Provider value={{ isOpen, currentIndex, images, openLightbox, closeLightbox, setCurrentIndex }}>
			{children}
			<LightboxContent showThumbnails={showThumbnails} />
		</LightboxContext.Provider>
	)
}

const useLightbox = () => {
	const context = useContext(LightboxContext)
	if (!context) {
		throw new Error('useLightbox must be used within a LightboxProvider')
	}
	return context
}

export const LightboxContent = ({ showThumbnails }: { showThumbnails?: boolean }) => {
	const { isOpen, currentIndex, images, closeLightbox, setCurrentIndex } = useLightbox()

	return (
		<Dialog
			open={isOpen}
			onOpenChange={open => {
				if (!open) closeLightbox()
			}}>
			<DialogPortal>
				<DialogOverlay />

				<DialogContent
					className={cn(
						'grid-container fixed left-[50%] top-[50%] z-50 h-full w-full translate-x-[-50%] translate-y-[-50%] items-center justify-center overflow-hidden rounded-md ring-0 duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]'
					)}>
					<div className='pointer-events-none flex size-full min-h-0 min-w-0 flex-col items-center justify-center'>
						<div className='relative h-full min-h-0 w-full py-8'>
							<div className='flex size-full max-h-full max-w-full grow items-center justify-center'>
								<Image
									src={images[currentIndex].url}
									alt={images[currentIndex].alt}
									width={1200}
									height={900}
									className='pointer-events-auto mx-4 size-auto max-h-full max-w-full rounded-md object-contain'
								/>
							</div>
							<LightboxControls />
						</div>

						{showThumbnails && (
							<ul className='pointer-events-auto flex shrink-0 flex-wrap items-center justify-center gap-2 py-4'>
								{images.map((img, i) => (
									<li key={img.url}>
										<button
											onClick={() => setCurrentIndex(i)}
											className={cn(
												'group relative size-12 cursor-pointer overflow-hidden rounded-sm border border-border sm:size-16',
												currentIndex === i && 'border-primary'
											)}>
											<Image
												src={img.url}
												alt={img.alt}
												width={50}
												height={50}
												className='size-full object-cover duration-200 group-hover:scale-105'
											/>
											{currentIndex === i && <div className='absolute inset-0 bg-primary/10' />}
										</button>
									</li>
								))}
							</ul>
						)}
					</div>
					<DialogClose className='absolute right-4 top-4 z-50 rounded-sm text-white opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none'>
						<X className='size-6' />
						<span className='sr-only'>Zamknij</span>
					</DialogClose>
				</DialogContent>
			</DialogPortal>
		</Dialog>
	)
}

export const LightboxControls = () => {
	const { currentIndex, images, setCurrentIndex, closeLightbox } = useLightbox()

	const handleNext = () => {
		if (currentIndex === images.length - 1) return setCurrentIndex(0)
		setCurrentIndex(currentIndex + 1)
	}

	const handlePrev = () => {
		if (currentIndex === 0) return setCurrentIndex(images.length - 1)
		setCurrentIndex(currentIndex - 1)
	}

	return (
		<div className='pointer-events-none absolute left-1/2 top-1/2 z-50 flex w-full -translate-x-1/2 -translate-y-1/2 items-center justify-between'>
			<button
				onClick={() => handlePrev()}
				className='pointer-events-auto flex items-center justify-center rounded-full border bg-secondary p-2 text-secondary-foreground duration-200 active:scale-90'>
				<span className='sr-only'>Poprzednie zdjęcie</span>
				<ChevronLeft className='size-6' />
			</button>
			<button
				onClick={() => handleNext()}
				className='pointer-events-auto flex items-center justify-center rounded-full border bg-secondary p-2 text-secondary-foreground duration-200 active:scale-90'>
				<span className='sr-only'>Następne zdjęcie</span>
				<ChevronRight className='size-6' />
			</button>
		</div>
	)
}

export const LightboxTrigger = ({
	children,
	index,
	className
}: {
	children: React.ReactNode
	index: number
	className?: string
}) => {
	const { openLightbox } = useLightbox()

	return (
		<div onClick={() => openLightbox(index)} className={cn('contents cursor-pointer', className)}>
			{children}
		</div>
	)
}
