import { Major, Unit } from '@prisma/client'
import Link from 'next/link'
import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/app/components/elements/Card'
import { Button } from '@/app/components/elements/Button'

type Props = { params: { unitId: number } }

const getUnits = async () => {
	const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/getUnits`)

	if (!res.ok) {
		console.log(res)
		throw new Error('Failed to fetch')
	}

	const units: (Unit & { majors: Major[] })[] = await res.json()

	return units
}

const UnitPage = async ({ params }: Props) => {
	const units = await getUnits()

	return (
		<main className='flex min-h-screen flex-col items-center wrapper pt-12'>
			<div className='flex flex-wrap gap-4 w-full'>
				{units.map(unit => (
					<Link href={`/units/${unit.id}`} key={unit.id} className='grow'>
						<Card className='h-full flex flex-col'>
							<CardHeader>
								<CardTitle>{unit.name}</CardTitle>
								<CardDescription className='capitalize'>{unit.unitType}</CardDescription>
							</CardHeader>
							<CardContent>
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
		</main>
	)
}

export default UnitPage
