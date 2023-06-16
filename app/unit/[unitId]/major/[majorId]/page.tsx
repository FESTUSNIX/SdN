import { Major, Qualification } from '@prisma/client'
import React from 'react'

type Props = { params: { majorId: number } }

const getMajor = async (id: number) => {
	const res = await fetch(`${process.env.BASE_URL}/api/getMajor?id=${id}`)

	if (!res.ok) {
		console.log(res)
		throw new Error('Failed to fetch')
	}

	const major: Major & { qualifications: Qualification[] } = await res.json()

	return major
}

const MajorPage = async ({ params }: Props) => {
	const major = await getMajor(params.majorId)

	console.log(major)

	return (
		<main className='flex min-h-screen flex-col items-center wrapper pt-12'>
			<h1 className='text-4xl font-black text-emerald-500 mb-24'>{major.name}</h1>
			<p>cost - {major.cost}</p>

			<ul className='mt-12 flex flex-col list-disc'>
				{major.qualifications?.map(qualification => (
					<li key={qualification.id}>
						{qualification.name} ({qualification.type})
					</li>
				))}
			</ul>
		</main>
	)
}

export default MajorPage
