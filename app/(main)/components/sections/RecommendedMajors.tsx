import MajorCard from '@/app/components/Majors/Card'
import prisma from '@/prisma/client'

type Props = {}

export const RecommendedMajors = async (props: Props) => {
	const majors = await prisma.major.findMany({
		take: 8,
		where: {
			status: 'PUBLISHED'
		},
		select: {
			id: true,
			name: true,
			majorLevel: true,
			isOnline: true,
			slug: true,
			qualifications: {
				select: {
					slug: true,
					name: true
				}
			},
			unit: {
				select: {
					name: true
				}
			}
		}
	})

	return (
		<section className='wrapper mb-32'>
			<h2 className='mx-auto mb-6 text-center font-heading text-3xl font-semibold sm:mb-8 sm:text-4xl md:mb-12 md:text-5xl'>
				Nasze rekomendacje
			</h2>

			<div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4'>
				{majors.map(major => (
					<MajorCard key={major.id} type='grid' likeable data={major} />
				))}
			</div>
		</section>
	)
}
