import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/app/components/ui/card'
import Link from 'next/link'

export function CustomLinkToolRenderer({ data }: any) {
	const linkHost = new URL(data.link).hostname

	return (
		<div className='not-prose my-2'>
			<Link href={data.link} target='_blank' rel='noopener' className='not-prose block max-w-2xl'>
				<Card>
					<CardHeader>
						<div className='flex w-full flex-col-reverse justify-between gap-4 md:flex-row md:gap-12'>
							<CardTitle>{data.meta.title}</CardTitle>
							{data.meta.image.url && (
								<div
									className='aspect-square w-16 shrink-0 rounded-md bg-cover bg-center'
									style={{ backgroundImage: `url(${data.meta.image.url})` }}
								/>
							)}
						</div>
					</CardHeader>
					{data.meta.description && (
						<CardContent className='max-md:truncate'>{(data.meta.description as string).slice(0, 160)}</CardContent>
					)}
					<CardFooter className='text-sm text-muted-foreground'>{linkHost}</CardFooter>
				</Card>
			</Link>
		</div>
	)
}
