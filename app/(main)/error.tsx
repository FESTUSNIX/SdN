'use client'
import { useEffect } from 'react'
import { H2 } from '../components/ui/Typography'
import { Button } from '../components/ui/button'

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
	useEffect(() => {
		console.error(error)
	}, [error])

	return (
		<div className='mx-auto flex flex-col items-center py-24'>
			<H2 size='base'>Coś poszło nie tak</H2>
			<Button onClick={() => reset()}>Spróbuj ponownie</Button>
		</div>
	)
}
