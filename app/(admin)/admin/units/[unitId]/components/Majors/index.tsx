import prisma from '@/prisma/client'
import { columns } from './components/MajorsTable/Columns'
import { MajorsTable } from './components/MajorsTable/MajorsTable'

type Props = {
	unitId: number
}

const Majors = async ({ unitId }: Props) => {
	const majors = await prisma.major.findMany({
		where: {
			unitId
		},
		select: {
			id: true,
			name: true,
			majorLevel: true,
			status: true,
			qualifications: {
				select: {
					id: true,
					name: true,
					type: true
				}
			},
			unitId: true
		}
	})

	return (
		<div className='mt-12'>
			<MajorsTable data={majors} columns={columns} />
		</div>
	)
}

export default Majors
