'use client'

import { selectComponents } from '@/app/components/Select/components/elements'
import { selectClassNames } from '@/app/components/Select/styles/classNames'
import { selectInlineStyles } from '@/app/components/Select/styles/inline'
import Select, { GroupBase, Props as SelectProps } from 'react-select'

type CustomProps = {
	onSelectChange(values: number[]): void
}

export function MultiSelect<
	OptionType,
	IsMulti extends boolean = false,
	GroupType extends GroupBase<OptionType> = GroupBase<OptionType>
>(props: SelectProps<OptionType, IsMulti, GroupType> & CustomProps) {
	return (
		<Select
			{...props}
			unstyled
			onChange={(option: any) => props.onSelectChange([...option?.map((opt: any) => opt.value)])}
			styles={selectInlineStyles as any}
			components={selectComponents as any}
			classNames={selectClassNames}
		/>
	)
}
