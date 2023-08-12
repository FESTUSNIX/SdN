import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/app/components/ui/Card'
import Link from 'next/link'
import React from 'react'
import { Major, Qualification } from '@prisma/client'
import { H3, Muted } from '@/app/components/ui/Typography'
import { ArrowRight } from 'lucide-react'

type Props = Pick<Major, 'id' | 'name' | 'unitSlug' | 'majorLevel' | 'startDate' | 'formOfStudy' | 'isOnline'> & {
	qualifications: {
		name: string
	}[]
}

const MajorCard = ({ id, name, formOfStudy, isOnline, majorLevel, startDate, unitSlug, qualifications }: Props) => {
	return (
		<Link href={`/majors/${id}`} key={id} className='h-auto'>
			<Card className='flex h-full flex-col'>
				<CardHeader>
					<H3 size='sm'>{name}</H3>
					<Muted className='flex flex-col'>
						<span>{isOnline ? 'Online' : 'Stacjonarne'}</span>
						<span>{majorLevel}</span>
					</Muted>
				</CardHeader>
				<CardContent>
					<ul className='flex flex-wrap items-center'>
						{qualifications.map((q, index, items) => (
							<li key={q.name} className='w-max max-w-full text-sm'>
								{q.name}
								{index !== items.length - 1 ? ', ' : ''}
							</li>
						))}
					</ul>
				</CardContent>
				<CardFooter className='mt-auto hover:underline'>
					<div className='ml-auto flex items-center'>
						<span className=''>See more</span>
						<ArrowRight className='ml-2 h-4 w-4 text-muted-foreground' />
					</div>
				</CardFooter>
			</Card>
		</Link>
	)
}

export default MajorCard
