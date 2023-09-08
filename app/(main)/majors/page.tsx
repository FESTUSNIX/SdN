import prisma from '@/prisma/client'
import Link from 'next/link'

const MajorsPage = async () => {
	const majors = await prisma.major.findMany({
		select: {
			slug: true,
			name: true
		}
	})

	return (
		<div className='wrapper flex min-h-screen flex-col items-center pt-12'>
			<div className='flex w-full flex-col'>
				{majors?.map(major => (
					<Link
						href={`/majors/${major.slug}`}
						key={major.slug}
						className='flex items-center justify-between border-b py-2'>
						<span className='mr-12 max-w-max truncate'>{major.name}</span>
						<span> {major.slug}</span>
					</Link>
				))}
			</div>
		</div>
	)
}

export default MajorsPage
