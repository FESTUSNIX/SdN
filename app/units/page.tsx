import Link from 'next/link'
import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/app/components/ui/Card'
import { Button } from '@/app/components/ui/Button'
import prisma from '@/prisma/client'

const UnitPage = async () => {
	const units = await prisma.unit.findMany({
		select: {
			id: true,
			name: true,
			unitType: true,
			majors: {
				select: {
					id: true,
					name: true
				}
			}
		}
	})

	return (
		<div className='wrapper flex min-h-screen flex-col items-center pt-12'>
			<div className='flex w-full flex-wrap gap-4'>
				{units?.map(unit => (
					<Link href={`/units/${unit.id}`} key={unit.id} className='grow'>
						<Card className='flex h-full flex-col'>
							<CardHeader>
								<CardTitle>{unit.name}</CardTitle>
								<CardDescription className='capitalize'>{unit.unitType}</CardDescription>
							</CardHeader>
							<CardContent>
								{unit.majors.splice(0, 3).map((major: any) => (
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
		</div>
	)
}

export default UnitPage
