'use client'

import { useContext } from 'react'
import { FormContext } from '../context/FormContext'

export const useFormContext = () => {
	const context = useContext(FormContext)

	if (!context) {
		throw Error('useFormContext must be used inside an FormContextProvider')
	}

	return context
}
