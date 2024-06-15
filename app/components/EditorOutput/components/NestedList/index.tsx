import { cn } from '@/lib/utils/utils'

type ListStyle = 'ordered' | 'unordered'

type ListItem = {
	content: string
	items: ListItem[]
}

type NestedListData = {
	style: ListStyle
	items: ListItem[]
}

export const ListWrapper = ({
	style,
	children,
	className
}: {
	style: 'unordered' | 'ordered'
	children: any
	className?: string
}): JSX.Element => {
	if (style === 'unordered') return <ul className={cn('tw-prose my-0 list-none', className)}>{children}</ul>
	if (style === 'ordered') return <ol className={cn('tw-prose my-0 list-none !pl-0', className)}>{children}</ol>

	return children
}

const NestedListItem = ({
	item,
	style,
	previousIndexes
}: {
	item: ListItem
	style: ListStyle
	previousIndexes: number[]
}) => {
	const prevIndexes = previousIndexes
		.map(i => (i + 1 !== 0 ? `${i + 1}.` : ''))
		.toString()
		.replaceAll(',', '')

	return (
		<li
			before-dynamic-value={style === 'ordered' ? prevIndexes : ''}
			className={cn(
				'my-0.5',
				style === 'ordered' && `list-none before:mr-2 before:content-[attr(before-dynamic-value)]`,
				style === 'unordered' && `before:mr-1.5 before:text-inherit before:content-['•']`
			)}>
			{item.content}
			{item.items?.length !== 0 && (
				<ListWrapper style={style}>
					{item.items.map((item, index) => (
						<NestedListItem item={item} previousIndexes={[...previousIndexes, index]} style={style} key={index} />
					))}
				</ListWrapper>
			)}
		</li>
	)
}

export function CustomListRenderer({ data }: any) {
	const { items, style } = data as NestedListData

	return (
		<ListWrapper style={style} className='my-2'>
			{items.map((item, index: number) => (
				<NestedListItem item={item} previousIndexes={[index]} style={style} key={index} />
			))}
		</ListWrapper>
	)
}
