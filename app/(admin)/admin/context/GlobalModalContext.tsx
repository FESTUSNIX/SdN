import React, { createContext, useContext, useReducer } from 'react'
import ConfirmSheetCloseModal from '../components/ConfirmSheetCloseModal'

type ModalContent = {
	title: string
	description: string
	content?: JSX.Element | null
	confirmButtonText?: string
	confirmButtonVariant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
	cancelButtonText?: string
	cancelButtonVariant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
	onConfirm: () => void
	onCancel?: () => void
}

type ModalState = {
	component: JSX.Element | null
	show: boolean
	modalContent: ModalContent | null
}

export type MODAL_TYPES = 'CUSTOM' | 'CONFIRM_SHEET_CLOSE' | 'CLOSE'

const defaultState = {
	component: null,
	show: false,
	modalContent: null
}

const modalReducer = (
	state: any,
	action: { type: MODAL_TYPES; modalContent?: ModalContent; component?: JSX.Element }
) => {
	const modalContent = action.modalContent
		? {
				title: action.modalContent?.title,
				description: action.modalContent?.description,
				content: action.modalContent?.content ?? null,
				confirmButtonText: action.modalContent?.confirmButtonText ?? 'Confirm',
				confirmButtonVariant: action.modalContent?.confirmButtonVariant ?? 'default',
				cancelButtonText: action.modalContent?.cancelButtonText ?? 'Cancel',
				cancelButtonVariant: action.modalContent?.cancelButtonVariant ?? 'outline',
				onConfirm: action.modalContent?.onConfirm,
				onCancel: action.modalContent?.onCancel
		  }
		: null

	switch (action.type) {
		case 'CUSTOM':
			return {
				modalContent,
				component: action.component ?? null,
				show: true
			}
		case 'CONFIRM_SHEET_CLOSE':
			return {
				component: <ConfirmSheetCloseModal />,
				show: true,
				modalContent: null
			}
		case 'CLOSE':
			return defaultState
	}
}

type GlobalModalContext = {
	openModal: (sheetType: MODAL_TYPES, modalContent?: ModalContent, component?: JSX.Element) => void
	closeModal: () => void
	modalState: ModalState
}

const initialState: GlobalModalContext = {
	openModal: () => {},
	closeModal: () => {},
	modalState: defaultState
}

const GlobalModalContext = createContext(initialState)

export const GlobalModalProvider = ({ children }: { children: React.ReactNode }) => {
	const [modalState, modalDispatch] = useReducer(modalReducer, defaultState)

	const openModal = (type: MODAL_TYPES, modalContent?: ModalContent, component?: JSX.Element) => {
		modalDispatch({
			type,
			modalContent,
			component
		})
	}

	const closeModal = () => {
		modalDispatch({
			type: 'CLOSE'
		})
	}

	return (
		<GlobalModalContext.Provider value={{ modalState, openModal, closeModal }}>{children}</GlobalModalContext.Provider>
	)
}

export const useGlobalModalContext = () => {
	const context = useContext(GlobalModalContext)

	if (!context) {
		console.log('useGlobalModalContext must be used inside an GlobalModalContext')
		throw Error('useGlobalModalContext must be used inside an GlobalModalContext')
	}

	return context
}
