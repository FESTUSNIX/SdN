import MajorCard from '@/app/components/Majors/Card'
import MajorsGrid from '@/app/components/Majors/Grid'
import SearchBar from '@/app/components/SearchBar'
import { H2 } from '@/app/components/ui/Typography'
import prisma from '@/prisma/client'

type Props = {
	unitSlug: string
	searchParams: { [key: string]: string | string[] | undefined }
}

const Majors = async ({ unitSlug, searchParams }: Props) => {
	const search = searchParams.mq?.toString()

	const majors = await prisma.major.findMany({
		where: {
			unitSlug,
			OR: [
				{
					name: {
						contains: search,
						mode: 'insensitive'
					}
				},
				{
					unit: {
						name: {
							contains: search,
							mode: 'insensitive'
						}
					}
				}
			]
		},
		select: {
			name: true,
			slug: true,
			isOnline: true,
			majorLevel: true,
			unit: {
				select: {
					name: true
				}
			},
			qualifications: {
				select: {
					name: true,
					slug: true
				}
			}
		}
	})

	if (!majors) return <p>Nie odnalezliśmy żadnych kierunków w tej jednostce</p>

	return (
		<section className='py-6'>
			<H2 className='mb-4' size='sm'>
				Kierunki <span className=''>({majors.length})</span>
			</H2>

			<SearchBar className='mb-8' param='mq' />

			{majors.length > 0 ? (
				<MajorsGrid listType='grid'>
					{majors.map(major => (
						<MajorCard key={major.slug} data={major} type='grid' />
					))}
				</MajorsGrid>
			) : (
				<p>Nie odnalezliśmy żadnych kierunków w tej jednostce</p>
			)}
		</section>
	)
}

export default Majors
