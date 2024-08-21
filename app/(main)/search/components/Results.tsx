import MajorCard from '@/app/components/Majors/Card'
import MajorsGrid from '@/app/components/Majors/Grid'
import { ResultsLoading } from '@/app/components/Majors/ResultsLoading'
import { Separator } from '@/app/components/ui/separator'
import { H2, H3 } from '@/app/components/ui/Typography'
import { MajorSearchResults } from '@/lib/queries/major'
import { PromotionInfoDialog } from './PromotionInfoDialog'

type Props = {
	majors: {
		premium: MajorSearchResults
		standard: MajorSearchResults
	}
	listType: 'grid' | 'list'
}

export const Results = async ({ majors, listType }: Props) => {
	const totalMajors = [...majors.premium, ...majors.standard]

	if (!totalMajors.length) {
		return (
			<div className='mx-auto py-4 text-center'>
				<H3>Nie udało się odnaleźć kierunku z podanymi kryteriami</H3>
				<p className='text-muted-foreground'>Usuń wybrane filtry aby przywrócić wszystkie wyniki</p>
			</div>
		)
	}

	return (
		<>
			<section>
				<ResultsLoading listType={listType}>
					{majors.premium.length > 0 && (
						<div>
							<div className='mb-4 flex items-center gap-2'>
								<H2 className='p-0'>Promowane kierunki</H2>
								<PromotionInfoDialog />
							</div>

							<MajorsGrid listType={listType} className='mb-4'>
								{majors?.premium.map(major => (
									<MajorCard
										key={major.slug}
										data={{
											name: major.name,
											slug: major.slug,
											isOnline: major.isOnline,
											majorLevel: major.majorLevel,
											qualifications: major.qualifications,
											unit: major.unit
										}}
										type={listType}
										hideBadges
									/>
								))}
							</MajorsGrid>

							{majors.standard.length > 0 && <Separator className='my-8' />}
						</div>
					)}
					<MajorsGrid listType={listType}>
						{majors.standard.length > 0 &&
							majors?.standard.map(major => (
								<MajorCard
									key={major.slug}
									data={{
										name: major.name,
										slug: major.slug,
										isOnline: major.isOnline,
										majorLevel: major.majorLevel,
										qualifications: major.qualifications,
										unit: major.unit
									}}
									type={listType}
								/>
							))}
					</MajorsGrid>
				</ResultsLoading>
			</section>
		</>
	)
}
