import prisma from '@/prisma/client'
import { columns } from './components/Columns'
import { MajorsTable } from './components/MajorsTable'

type Props = {
	unitId: number
}

const Majors = async ({ unitId }: Props) => {
	const majors = await prisma.major.findMany({
		where: {
			unitId
		},
		include: {
			qualifications: {
				select: {
					id: true,
					name: true,
					type: true
				}
			}
		}
	})

	return (
		<div>
			<MajorsTable data={majors} columns={columns} unitId={unitId} />
		</div>
	)
}

export default Majors
