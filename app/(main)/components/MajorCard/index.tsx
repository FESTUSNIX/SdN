import { Badge } from '@/app/components/ui/Badge'
import { Card, CardContent, CardFooter, CardHeader } from '@/app/components/ui/Card'
import { H3, H4 } from '@/app/components/ui/Typography'
import { majorLevelEnum } from '@/app/constants/majorLevelEnum'
import { Major } from '@prisma/client'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

type Props = Pick<Major, 'id' | 'name' | 'majorLevel' | 'isOnline'> & {
	qualifications: {
		name: string
	}[]
}

const MajorCard = ({ id, name, isOnline, majorLevel, qualifications }: Props) => {
	return (
		<Link href={`/majors/${id}`} key={id} className='h-auto'>
			<Card className='flex h-full flex-col'>
				<CardHeader>
					<H3 size='sm'>{name}</H3>

					<div className='flex items-center gap-2'>
						<Badge variant='secondary'>{majorLevelEnum[majorLevel]}</Badge>
						<Badge variant='secondary'>{isOnline ? 'Online' : 'Stacjonarne'}</Badge>
					</div>
				</CardHeader>
				<CardContent>
					<H4 size='sm'>Uprawnia do</H4>
					<div className='tw-prose'>
						<ul className='flex flex-wrap items-center'>
							{qualifications.map((q, index, items) => (
								<li key={q.name} className='w-max max-w-full text-sm'>
									{q.name}
									{index !== items.length - 1 ? ', ' : ''}
								</li>
							))}
						</ul>
					</div>
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
