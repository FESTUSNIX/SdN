'use client'
import { useEffect } from 'react'
import { H2 } from '../components/ui/Typography'
import { Button } from '../components/ui/button'

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
	useEffect(() => {
		console.error(error)
	}, [error])

	return (
		<div>
			<H2>Coś poszło nie tak</H2>
			<Button onClick={() => reset()}>Spróbuj ponownie</Button>
		</div>
	)
}
