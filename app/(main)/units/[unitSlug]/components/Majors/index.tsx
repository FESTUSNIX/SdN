import { H2 } from '@/app/components/ui/Typography'
import prisma from '@/prisma/client'
import { Results } from './Results'

type Props = {
	unitSlug: string
}

const Majors = async ({ unitSlug }: Props) => {
	const majors = await prisma.major.findMany({
		where: {
			unitSlug,
			status: 'PUBLISHED'
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

			<Results majors={majors} />
		</section>
	)
}

export default Majors
