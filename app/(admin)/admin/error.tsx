'use client' // Error components must be Client Components

import { Button, buttonVariants } from '@/app/components/ui/Button'
import { H1, H2, H3 } from '@/app/components/ui/Typography'
import Link from 'next/link'
import { useEffect } from 'react'

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
	useEffect(() => {
		// Log the error to an error reporting service
		console.error(error)
	}, [error])

	return (
		<div className='flex h-full w-full flex-col items-center justify-center px-8 py-12 md:py-24 lg:py-32'>
			<h2 className='mb-4 text-2xl font-medium'>There was a problem</h2>
			<H1 className='mb-6 max-w-3xl text-center'>{error.message}</H1>
			<h3 className='text-lg text-muted-foreground'>Please try again later or contact support </h3>

			<div className='mt-12 flex items-center gap-4'>
				<Link
					href={'/'}
					className={buttonVariants({
						variant: 'outline'
					})}>
					Go back home
				</Link>
				<Button
					onClick={
						// Attempt to recover by trying to re-render the segment
						() => reset()
					}>
					Try again
				</Button>
			</div>
		</div>
	)
}
