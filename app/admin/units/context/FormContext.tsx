'use client'

import { UnitPayload } from '@/lib/validators/unit'
import { createContext, useState } from 'react'

type FormContextType = {
	openEdit: boolean
	setOpenEdit: (value: boolean) => void
	openAdd: boolean
	setOpenAdd: (value: boolean) => void
	editDefaultValues: UnitPayload
	setEditDefaultValues: (value: UnitPayload) => void
}

export const FormContext = createContext<FormContextType | null>(null)

export const FormContextProvider = ({ children }: { children: React.ReactNode }) => {
	const [openEdit, setOpenEdit] = useState(false)
	const [openAdd, setOpenAdd] = useState(false)
	const [editDefaultValues, setEditDefaultValues] = useState<UnitPayload>({
		name: '',
		logo: undefined as any,
		email: '',
		isPublic: true,
		nip: '',
		regon: '',
		unitType: 'uczelnia',
		website: '',
		street: '',
		postalCode: '',
		cityId: 0,
		notes: '',
		status: 'IN_PROGRESS'
	})

	return (
		<FormContext.Provider
			value={{ openEdit, setOpenEdit, openAdd, setOpenAdd, editDefaultValues, setEditDefaultValues }}>
			{children}
		</FormContext.Provider>
	)
}
