'use client'

import { Input } from '@/app/components/ui/Input'
import { forwardRef } from 'react'
import { ControllerRenderProps } from 'react-hook-form'

export const TestFieldEdit = forwardRef((props: ControllerRenderProps, ref) => {
	return (
		<div>
			<Input {...props} />
		</div>
	)
})

TestFieldEdit.displayName = 'TestFieldEdit'


