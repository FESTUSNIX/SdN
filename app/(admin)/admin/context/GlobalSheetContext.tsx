import React, { createContext, useContext, useReducer, useState } from 'react'
import GlobalSheet from '../components/GlobalSheet'
import AddUnit from '../units/components/AddUnit'
import EditUnit from '../units/components/EditUnit'
import AddMajor from '../units/[unitId]/components/Majors/components/AddMajor'
import EditMajor from '../units/[unitId]/components/Majors/components/EditMajor'

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
	openSheet: (sheetType: SHEET_TYPES, defaultValues: any) => void
	closeSheet: () => void
	sheetState: SheetState
}

const initialState: GlobalSheetContext = {
	openSheet: () => {},
	closeSheet: () => {},
	sheetState: defaultState
}

const GlobalSheetContext = createContext(initialState)

export const GlobalSheetProvider = ({ children }: { children: React.ReactNode }) => {
	const [sheetState, sheetDispatch] = useReducer(sheetReducer, defaultState)

	const openSheet = (type: SHEET_TYPES, defaultValues?: any) => {
		sheetDispatch({
			type,
			defaultValues
		})
	}

	const closeSheet = () => {
		sheetDispatch({
			type: 'CLOSE'
		})
	}

	return (
		<GlobalSheetContext.Provider value={{ sheetState, openSheet, closeSheet }}>
			{children}

			<GlobalSheet />
		</GlobalSheetContext.Provider>
	)
}

export const useGlobalSheetContext = () => useContext(GlobalSheetContext)
