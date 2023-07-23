import PreviousPageButton from '@/app/(admin)/admin/components/PreviousPageButton'
import { buttonVariants } from '@/app/components/ui/Button'
import { H3 } from '@/app/components/ui/Typography'
import { cn } from '@/lib/utils/utils'
import prisma from '@/prisma/client'
import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

type Props = { params: { unitId: string; majorId: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const id = params.majorId

	const major = await prisma.major.findFirst({
		where: {
			id: parseInt(id)
		},
		select: {
			name: true
		}
	})

	return {
		title: `${major?.name} | SdN`
	}
}

const MajorPage = async ({ params: { unitId, majorId } }: Props) => {
	const major = await prisma.major.findFirst({
		where: {
			id: parseInt(majorId)
		},
		include: {
			unit: {
				select: {
					name: true
				}
			},
			qualifications: {
				select: {
					id: true,
					name: true,
					type: true
				}
			}
		}
	})

	if (!major) return notFound()

	return (
		<div className='flex min-h-screen flex-col pt-12'>
			<div className='wrapper'>
				<PreviousPageButton />

				<h1 className='scroll-m-20 text-2xl font-extrabold tracking-tight sm:text-3xl md:text-4xl'>
					<span>#{major.id} </span>
					{major.name}
				</h1>
				<h2 className='mt-4 text-xl text-foreground/70'>
					<Link href={`/admin/units/${unitId}`} className='underline-offset-2 hover:underline'>
						{major.unit.name}
					</Link>
				</h2>

				<div className='mt-24'>
					<div className='mb-8'>
						<H3 className='mb-4'>Major details</H3>
						<ul className='flex flex-col gap-2.5'>
							<li className='flex items-center'>
								<span className='text-lg first-letter:uppercase'>Major level:&nbsp;</span>
								<span className='text-foreground/70'>{major.majorLevel}</span>
							</li>
							<li className='flex items-center'>
								<span className='text-lg first-letter:uppercase'>Status:&nbsp;</span>
								<span className='text-foreground/70'>{major.status}</span>
							</li>
							<li className='flex items-center'>
								<span className='text-lg first-letter:uppercase'>Unit ID:&nbsp;</span>
								<span className='text-foreground/70'>{major.unitId}</span>
							</li>
						</ul>
					</div>

					<div>
						<H3 className='mb-4'>Qualifications</H3>
						<ul>
							{major.qualifications.map(qualification => (
								<li key={qualification.id} className='mb-8 flex items-center'>
									<span className='text-lg first-letter:uppercase'>{qualification.name}:&nbsp;</span>
									<span className='text-foreground/70'>{qualification.type}</span>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</div>
	)
}

export default MajorPage
