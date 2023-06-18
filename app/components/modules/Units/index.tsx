import React from 'react'
import { Major, Unit } from '@prisma/client'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/app/components/elements/Card'
import { Button } from '../../elements/Button'

type Props = {}

const Units = async (props: Props) => {
	const res = await fetch(`${process.env.BASE_URL}/api/getUnits`)

	if (!res.ok) {
		console.log(res)
		throw new Error('Failed to fetch')
	}

	const units: (Unit & { majors: Major[] })[] = await res.json()

	return (
		<section className='py-24 w-full'>
			<div className='flex flex-col gap-4'>
				{units.map(unit => (
					<Link href={`/units/${unit.id}`} key={unit.id} className='grow'>
						<Card className='h-full flex flex-col'>
							<CardHeader>
								<CardTitle>{unit.name}</CardTitle>
								<CardDescription className='capitalize'>{unit.unitType}</CardDescription>
							</CardHeader>
							<CardContent>
								<p>Kierunki</p>
								{unit.majors.splice(0, 3).map(major => (
									<div key={major.id}>{major.name}</div>
								))}
							</CardContent>
							<CardFooter className='mt-auto'>
								<Button variant={'secondary'}>View</Button>
							</CardFooter>
						</Card>
					</Link>
				))}
			</div>
		</section>
	)
}

export default Units
