'use client'

import React, { createContext, useContext, useState } from 'react'

interface TransitionLoadingContextProps {
	children: React.ReactNode
}

interface TransitionLoadingContextValue {
	isLoading: boolean
	startLoading: () => void
	stopLoading: () => void
}

const TransitionLoadingContext = createContext<TransitionLoadingContextValue | undefined>(undefined)

export const TransitionLoadingProvider: React.FC<TransitionLoadingContextProps> = ({ children }) => {
	const [isLoading, setIsLoading] = useState(false)

	const startLoading = () => setIsLoading(true)
	const stopLoading = () => setIsLoading(false)
	
	return (
		<TransitionLoadingContext.Provider value={{ isLoading, startLoading, stopLoading }}>
			{children}
		</TransitionLoadingContext.Provider>
	)
}

export const useTransitionLoading = () => {
	const context = useContext(TransitionLoadingContext)
	if (!context) {
		throw new Error('useTransitionLoading must be used within a TransitionLoadingProvider')
	}
	return context
}
