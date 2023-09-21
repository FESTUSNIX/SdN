import MajorCard from '@/app/(main)/components/MajorCard'
import { H2 } from '@/app/components/ui/Typography'
import prisma from '@/prisma/client'

type Props = {
	unitSlug: string
}

const Majors = async ({ unitSlug }: Props) => {
	const majors = await prisma.major.findMany({
		where: {
			unitSlug
		},
		select: {
			slug: true,
			name: true,
			formOfStudy: true,
			isOnline: true,
			majorLevel: true,
			startDate: true,
			unitSlug: true,
			qualifications: {
				select: {
					name: true
				}
			}
		}
	})

	if (!majors) return <p>Nie znaleziono żadnych kierunków</p>

	return (
		<section className='py-6'>
			<H2 className='mb-2' size='sm'>
				Kierunki
			</H2>

			<div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
				{majors.map(major => (
					<MajorCard key={major.slug} {...major} />
				))}
			</div>
		</section>
	)
}

export default Majors
