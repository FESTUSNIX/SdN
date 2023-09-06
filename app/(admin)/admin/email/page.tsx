import prisma from '@/prisma/client'
import FirstUnitEmail from './components/FirstUnitEmail'

export default async function EmailPage() {
	const majors = await prisma.major.findMany({
		where: {
			unitId: 93
		}
	})

	return (
		<div>
			<FirstUnitEmail majors={majors} />
		</div>
	)
}
