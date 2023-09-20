import prisma from '@/prisma/client'
import FirstUnitEmail from './components/FirstUnitEmail'
import { render } from '@react-email/render'

export default async function EmailPage() {
	const majors = await prisma.major.findMany({
		where: {
			unitId: 93
		},
		include: {
			qualifications: {
				select: {
					name: true
				}
			}
		}
	})

	const emailHtml = render(<FirstUnitEmail majors={majors} />)

	return (
		<div className='w-full'>
			<iframe className='h-full w-full' srcDoc={emailHtml}></iframe>
		</div>
	)
}
