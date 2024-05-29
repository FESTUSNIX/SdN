import React, { createContext, useContext, useReducer, useState } from 'react'
import { SHEETS, SheetTypes } from '../components/Sheets'
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

type ActionType = { type: SheetTypes; defaultValues?: any } | { type: 'OVERRIDE'; newData: any }

const sheetReducer = (state: any, action: ActionType) => {
	if (action.type === 'CLOSE') {
		return defaultState
	}

	if (action.type === 'OVERRIDE') {
		return {
			...state,
			defaultValues: action.newData
		}
	}

	const Component = SHEETS[action.type]

	if (Component) {
		return {
			content: <Component />,
			show: true,
			defaultValues: action.defaultValues,
			overrideData: state.overrideData || (() => {})
		}
	}

	return state
}

type GlobalSheetContext = {
	openSheet: (sheetType: SheetTypes, defaultValues?: any) => void
	closeSheet: (requireConfirmModal?: boolean, closeConfirmed?: boolean) => void
	sheetState: SheetState
	setRequireConfirmation: (isFormDirty: boolean) => void
	overrideData: (newData: any) => void
}

const initialState: GlobalSheetContext = {
	openSheet: () => {},
	closeSheet: () => {},
	sheetState: defaultState,
	setRequireConfirmation: () => {},
	overrideData: () => {}
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

	// New function to override data
	const overrideData = (newData: any) => {
		sheetDispatch({
			type: 'OVERRIDE',
			newData
		})
	}

	return (
		<GlobalSheetContext.Provider value={{ sheetState, openSheet, closeSheet, setRequireConfirmation, overrideData }}>
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
