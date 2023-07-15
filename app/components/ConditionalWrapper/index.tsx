type Props = {
	condition: boolean
	wrapper: (children: any) => any
	children: any
}

export const ConditionalWrapper = ({ condition, wrapper, children }: Props): JSX.Element =>
	condition ? wrapper(children) : children
