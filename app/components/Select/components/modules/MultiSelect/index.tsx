'use client'

import { selectComponents } from '@/app/components/Select/components/elements'
import { selectClassNames } from '@/app/components/Select/styles/classNames'
import { selectInlineStyles } from '@/app/components/Select/styles/inline'
import Select from 'react-select'

type Option = {
	value: number | string
	label: string
}

type Props = {
	placeholder?: string
	options: Option[]
	onSelectChange(values: number[]): void
	defaultValues?: Option[]
}

export function MultiSelect({ placeholder = 'Select...', options, onSelectChange, defaultValues }: Props) {
	return (
		<Select
			unstyled
			defaultValue={defaultValues}
			onChange={(option: any) => onSelectChange([...option?.map((opt: any) => opt.value)])}
			isMulti
			isClearable={false}
			options={options}
			placeholder={placeholder}
			styles={selectInlineStyles}
			components={selectComponents}
			classNames={selectClassNames}
		/>
	)
}
