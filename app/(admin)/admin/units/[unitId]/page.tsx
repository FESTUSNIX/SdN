import { buttonVariants } from '@/app/components/ui/Button'
import { cn } from '@/lib/utils/utils'
import prisma from '@/prisma/client'
import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Majors from './components/Majors'

type Props = { params: { unitId: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const id = params.unitId

	const unit = await prisma.unit.findFirst({
		where: {
			id: parseInt(id)
		}
	})

	return {
		title: `${unit?.name} | SdN`
	}
}

const AdminUnitPage = async ({ params: { unitId } }: Props) => {
	const unit = await prisma.unit.findFirst({
		where: {
			id: parseInt(unitId)
		},
		include: {
			city: {
				select: {
					id: true,
					name: true,
					voivodeship: true
				}
			},
			address: {
				select: {
					id: true,
					street: true,
					city: true,
					postalCode: true
				}
			}
		}
	})

	if (!unit) return notFound()

	return (
		<div className='flex min-h-screen flex-col pt-12'>
			<div className='wrapper'>
				<h1 className='scroll-m-20 text-2xl font-extrabold tracking-tight sm:text-3xl md:text-4xl'>
					<span>#{unit.id} </span>
					{unit.name}
				</h1>

				<Link
					target='_blank'
					href={unit.website}
					className={cn(
						buttonVariants({
							variant: 'link'
						}),
						'mt-6 self-start pl-0'
					)}>
					{unit.website}
				</Link>
			</div>

			<Majors unitId={unit.id} />
		</div>
	)
}

export default AdminUnitPage
