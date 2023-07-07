import React, { createContext, useContext, useReducer, useState } from 'react'
import AddMajor from '../units/[unitId]/components/Majors/components/AddMajor'
import EditMajor from '../units/[unitId]/components/Majors/components/EditMajor'
import AddUnit from '../units/components/AddUnit'
import EditUnit from '../units/components/EditUnit'
import { useGlobalModalContext } from './GlobalModalContext'

type SheetState = {
	content: JSX.Element | null
	show: boolean
	defaultValues?: any
}

export type SHEET_TYPES = 'ADD_UNIT' | 'EDIT_UNIT' | 'ADD_MAJOR' | 'EDIT_MAJOR' | 'CLOSE'

const defaultState = {
	content: null,
	show: false,
	defaultValues: {}
}

const sheetReducer = (state: any, action: { type: SHEET_TYPES; defaultValues?: any }) => {
	switch (action.type) {
		case 'ADD_UNIT':
			return {
				content: <AddUnit />,
				show: true,
				defaultValues: action.defaultValues
			}
		case 'EDIT_UNIT':
			return {
				content: <EditUnit />,
				show: true,
				defaultValues: action.defaultValues
			}
		case 'ADD_MAJOR':
			return {
				content: <AddMajor />,
				show: true,
				defaultValues: action.defaultValues
			}
		case 'EDIT_MAJOR':
			return {
				content: <EditMajor />,
				show: true,
				defaultValues: action.defaultValues
			}
		case 'CLOSE':
			return defaultState 
	}
}

type GlobalSheetContext = {
	openSheet: (sheetType: SHEET_TYPES, defaultValues?: any) => void
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

	const openSheet = (type: SHEET_TYPES, defaultValues?: any) => {
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
