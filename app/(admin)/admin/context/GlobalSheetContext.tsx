import React, { createContext, useContext, useReducer, useState } from 'react'
import { SHEETS, SheetTypes } from '../constants/Sheets'
import { useGlobalModalContext } from './GlobalModalContext'

type SheetState = {
	content: JSX.Element | null
	show: boolean
	defaultValues?: any
}

const defaultState = {
	content: null,
	show: false,
	defaultValues: {}
}

const sheetReducer = (state: any, action: { type: SheetTypes; defaultValues?: any }) => {
	const Component = SHEETS[action.type]

	if (action.type === 'CLOSE') {
		return defaultState
	}

	if (Component) {
		return {
			content: <Component />,
			show: true,
			defaultValues: action.defaultValues
		}
	}

	return state
}

type GlobalSheetContext = {
	openSheet: (sheetType: SheetTypes, defaultValues?: any) => void
	closeSheet: (requireConfirmModal?: boolean, closeConfirmed?: boolean) => void
	sheetState: SheetState
	setRequireConfirmation: (isFormDirty: boolean) => void
}

const initialState: GlobalSheetContext = {
	openSheet: () => {},
	closeSheet: () => {},
	sheetState: defaultState,
	setRequireConfirmation: () => {}
}

const GlobalSheetContext = createContext(initialState)

export const GlobalSheetProvider = ({ children }: { children: React.ReactNode }) => {
	const [sheetState, sheetDispatch] = useReducer(sheetReducer, defaultState)
	const [requireConfirmation, setRequireConfirmation] = useState(false)

	const { openModal } = useGlobalModalContext()

	const openSheet = (type: SheetTypes, defaultValues?: any) => {
		sheetDispatch({
			type,
			defaultValues
		})
	}

	const closeSheet = (requireConfirmModal: boolean = false, closeConfirmed: boolean = false) => {
		if ((requireConfirmModal || requireConfirmation) && !closeConfirmed) {
			return openModal('CONFIRM_SHEET_CLOSE')
		}

		sheetDispatch({
			type: 'CLOSE'
		})

		setRequireConfirmation(false)
	}

	return (
		<GlobalSheetContext.Provider value={{ sheetState, openSheet, closeSheet, setRequireConfirmation }}>
			{children}
		</GlobalSheetContext.Provider>
	)
}

export const useGlobalSheetContext = () => {
	const context = useContext(GlobalSheetContext)

	if (!context) {
		console.log('useGlobalSheetContext must be used inside an GlobalSheetContext')
		throw Error('useGlobalSheetContext must be used inside an GlobalSheetContext')
	}

	return context
}
