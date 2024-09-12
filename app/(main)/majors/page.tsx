import prisma from '@/prisma/client'
import { Metadata } from 'next'
import Link from 'next/link'

export const dynamic = 'force-static'

export const metadata: Metadata = {
	title: 'Lista kierunków studiów',
	description: 'Lista wszystkich kierunków studiów dla nauczycieli w Polsce dostępnych na naszym portalu.'
}

const MajorsPage = async () => {
	const majors = await prisma.major.findMany({
		where: {
			status: 'PUBLISHED'
		},
		select: {
			slug: true,
			name: true,
			unit: {
				select: {
					name: true
				}
			}
		}
	})

	return (
		<div className='wrapper flex min-h-screen flex-col items-center pt-12'>
			<div className='flex w-full flex-col'>
				{majors?.map(major => (
					<Link
						href={`/majors/${major.slug}`}
						key={major.slug}
						className='flex flex-wrap items-center justify-between gap-x-8 gap-y-2 border-b py-2'>
						<span className='mr-12 max-w-max truncate'>{major.name}</span>
						<span className='text-sm text-muted-foreground'> {major.unit.name}</span>
					</Link>
				))}
			</div>
		</div>
	)
}

export default MajorsPage
