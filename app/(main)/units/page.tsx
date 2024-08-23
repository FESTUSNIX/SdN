import prisma from '@/prisma/client'
import Link from 'next/link'

export const dynamic = 'force-static'

const UnitsPage = async () => {
	const units = await prisma.unit.findMany({
		select: {
			id: true,
			slug: true,
			name: true,
			_count: {
				select: {
					majors: true
				}
			}
		}
	})

	return (
		<div className='wrapper flex min-h-screen flex-col items-center pt-12'>
			<div className='flex w-full flex-col'>
				{units?.map(unit => (
					<Link
						href={`/units/${unit.slug}`}
						key={unit.slug}
						className='flex items-center justify-between border-b py-2'>
						<span className='mr-12 max-w-max truncate'>{unit.name}</span>
						<span>{unit._count.majors} kierunków</span>
					</Link>
				))}
			</div>
		</div>
	)
}

export default UnitsPage
