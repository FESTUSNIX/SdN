'use client'

import { useGlobalSheetContext } from '@/app/(admin)/admin/context/GlobalSheetContext'
import { useEffect } from 'react'
import { FormState } from 'react-hook-form'

export const useFormChanges = (formState: FormState<any>) => {
	const { setRequireConfirmation } = useGlobalSheetContext()

	const isDirty = formState.isDirty

	useEffect(() => {
		setRequireConfirmation(isDirty)
	}, [isDirty])
}
