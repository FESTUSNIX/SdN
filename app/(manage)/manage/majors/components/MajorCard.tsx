import { Skeleton } from '@/app/components/ui/skeleton'
import { majorLevelEnum } from '@/app/constants/majorLevelEnum'
import { urlFor } from '@/lib/supabase/getUrlFor'
import { Major } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
	data: Pick<Major, 'name' | 'majorLevel' | 'isOnline' | 'slug'> & {
		qualifications: {
			slug: string
			name: string
		}[]
	}
}

const MajorCard = ({ data }: Props) => {
	const { name, isOnline, majorLevel, qualifications, slug } = data

	return (
		<Link
			href={`/manage/majors/${slug}`}
			className='flex flex-row gap-4 rounded-lg p-3 duration-300 hover:shadow dark:border dark:hover:border-border max-md:shadow dark:md:border-transparent lg:gap-6'>
			<div className='relative mt-1 hidden h-12 w-12 shrink-0 md:block lg:mt-0 lg:h-28 lg:w-28'>
				<Image
					src={urlFor('qualification_images', `${qualifications[0]?.slug}.jpg`).publicUrl}
					alt={`Zdjęcie kwalifikacji ${qualifications[0]?.name}`}
					width={200}
					height={200}
					className='pointer-events-none z-10 h-full w-full select-none rounded-lg object-cover'
				/>
				<Skeleton className='absolute inset-0 -z-10 rounded-lg' />
			</div>

			<div className=''>
				<h3 className='truncate-vertical-2 mb-2 text-base leading-tight'>{name}</h3>

				<div className='flex flex-col gap-1 dark:text-muted-foreground'>
					<div className='my-1 flex gap-1 md:my-0 md:flex-col'>
						<h4 className='text-xs'>
							<span className='max-md:sr-only'>Poziom: </span>
							<span className='max-md:rounded-full max-md:bg-muted max-md:px-1.5 max-md:py-0.5'>
								{majorLevelEnum[majorLevel]}
							</span>
						</h4>
						<h4 className='text-xs'>
							<span className='max-md:sr-only'>Tryb: </span>
							<span className='max-md:rounded-full max-md:bg-muted max-md:px-1.5 max-md:py-0.5'>
								{isOnline ? 'Online' : 'Stacjonarny'}
							</span>
						</h4>
					</div>
					<h4 className='my-1 text-xs'>
						<span className='   '>Kwalifikacje: </span>
						<span className=''>
							{[
								...qualifications,
								{ slug: 'xdddd', name: 'informatyka' },
								{ slug: 'xdddd', name: 'technik mcdonalds' }
							].map((qualification, i, elements) => `${qualification.name}${i !== elements.length - 1 ? ', ' : ''}`)}
						</span>
					</h4>
				</div>
			</div>
		</Link>
	)
}

export default MajorCard
