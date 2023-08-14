import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/app/components/ui/Table'

type TableDataType = {
	content: string[][]
	withHeadings: boolean
}

export function CustomTableRenderer({ data }: { data: TableDataType }) {
	const { content, withHeadings } = data

	return (
		<Table className='max-w-full'>
			{withHeadings && (
				<TableHeader>
					<TableRow>
						{content[0].map((cell, index) => (
							<TableHead key={index}>{cell}</TableHead>
						))}
					</TableRow>
				</TableHeader>
			)}
			<TableBody>
				{content.slice(withHeadings ? 1 : 0).map((row, index) => (
					<TableRow key={index}>
						{row.map((cell, index) => (
							<TableCell key={index}>{cell}</TableCell>
						))}
					</TableRow>
				))}
			</TableBody>
		</Table>
	)
}
