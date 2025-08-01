import { useRef } from 'react'

export function usePrevious<T>(value: T): T | undefined {
	const currentRef = useRef<T>()
	const previousRef = useRef<T>()

	if (currentRef.current !== value) {
		previousRef.current = currentRef.current
		currentRef.current = value
	}

	return previousRef.current
}
