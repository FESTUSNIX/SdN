import prisma from '@/prisma/client'
import { Metadata } from 'next'
import Majors from '../components/Majors'

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
		title: `${unit?.name ?? 'Unit'} - Majors`
	}
}

const MajorsPage = async ({ params: { unitId } }: Props) => {
	return (
		<main className='flex flex-col md:h-screen'>
			<Majors unitId={parseInt(unitId)} />
		</main>
	)
}

export default MajorsPage
