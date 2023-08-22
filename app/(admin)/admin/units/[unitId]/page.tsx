import { buttonVariants } from '@/app/components/ui/Button'
import { cn } from '@/lib/utils/utils'
import prisma from '@/prisma/client'
import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import PreviousPageButton from '../../components/PreviousPageButton'
import Majors from './components/Majors'
import Emails from './components/Emails'
import { ScrollArea } from '@/app/components/ui/ScrollArea'
import AdminWrapper from '../../components/AdminWrapper'

type Props = {
	params: { unitId: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const id = params.unitId

	const unit = await prisma.unit.findFirst({
		where: {
			id: parseInt(id)
		},
		select: {
			name: true
		}
	})

	return {
		title: `${unit?.name ?? 'Unit'}`
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
		<main className='flex flex-1 overflow-x-hidden'>
			<AdminWrapper className='wrapper'>
				<PreviousPageButton />

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

				<Majors unitId={unit.id} />
			</AdminWrapper>

			<Emails />
		</main>
	)
}

export default AdminUnitPage
