import { Skeleton } from '@/app/components/ui/skeleton'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/app/components/ui/Tooltip'
import { majorLevelEnum } from '@/app/constants/majorLevel'
import { urlFor } from '@/lib/supabase/getUrlFor'
import { cn } from '@/lib/utils/utils'
import { Major } from '@prisma/client'
import { ArrowDownToLine, ArrowUpToLine, Loader2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { StatusEdit } from './StatusEdit'

type Props = {
	data: Pick<Major, 'id' | 'name' | 'majorLevel' | 'isOnline' | 'slug' | 'status'> & {
		qualifications: {
			slug: string
			name: string
		}[]
	}
	useStatusButton?: boolean
	className?: string
}

const MajorCard = ({ data, useStatusButton = true, className }: Props) => {
	const { id, name, isOnline, majorLevel, qualifications, slug, status } = data

	return (
		<Link
			href={`/manage/majors/${slug}`}
			className={cn(
				'relative flex flex-row gap-4 rounded-lg border p-3 duration-300 hover:shadow dark:hover:border-foreground/40 lg:gap-6',
				className
			)}>
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
							{qualifications.map(
								(qualification, i, elements) => `${qualification.name}${i !== elements.length - 1 ? ', ' : ''}`
							)}
						</span>
					</h4>
				</div>
			</div>

			{useStatusButton && (
				<div className='absolute right-3 top-3'>
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<StatusEdit
									id={id}
									name={name}
									status={status}
									revalidationPath={'/manage/majors'}
									variant={'outline'}
									size={'iconSm'}
									className={cn('group', status === 'DRAFT' ? 'hover:border-green-600' : 'hover:border-destructive')}>
									<span className='sr-only'>Status publikacji</span>
									{status === 'DRAFT' ? (
										<ArrowUpToLine className='size-4 text-green-600 group-disabled:hidden' />
									) : (
										<ArrowDownToLine className='size-4 text-muted-foreground duration-300 group-hover:text-destructive group-disabled:hidden' />
									)}
									<Loader2 className='hidden size-4 animate-spin text-muted-foreground group-disabled:block' />
								</StatusEdit>
							</TooltipTrigger>
							<TooltipContent>{status === 'DRAFT' ? 'Opublikuj' : 'Cofnij publikację'}</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</div>
			)}
		</Link>
	)
}

export default MajorCard
