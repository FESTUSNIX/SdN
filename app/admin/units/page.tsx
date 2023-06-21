import { H1 } from '@/app/components/elements/Typography'
import UnitForm from '../components/modules/UnitForm'
import { Sheet, SheetTrigger } from '@/app/components/elements/Sheet'
import { Button } from '@/app/components/elements/Button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/app/components/elements/Table'
import { getUnits } from '@/lib/prisma/getUnits'
import Link from 'next/link'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/app/components/elements/Tooltip'

export default async function UnitsPage() {
	const { units } = await getUnits()

	return (
		<main className='flex min-h-screen flex-col items-center wrapper pt-12'>
			<H1 className='mb-24'>Units panel</H1>

			<section className='w-full flex justify-end mb-8'>
				<Sheet>
					<SheetTrigger asChild>
						<Button>New Unit</Button>
					</SheetTrigger>
					<UnitForm />
				</Sheet>
			</section>

			<section className='w-full mb-12'>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className='w-12'>#</TableHead>
							<TableHead>Name</TableHead>
							<TableHead>Email</TableHead>
							<TableHead>City</TableHead>
							<TableHead className='text-right'>Website</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{units?.map(unit => (
							<TableRow key={unit.id}>
								<TableCell className='font-medium'>
									<Link href={`/admin/units/${unit.id}`} key={unit.id}>
										{unit.id}
									</Link>
								</TableCell>
								<TableCell>{unit.name}</TableCell>
								<TableCell>{unit.email}</TableCell>
								<TableCell>{unit.city?.name}</TableCell>
								<TableCell className='text-right flex justify-end items-center'>
									<TooltipProvider>
										<Tooltip>
											<TooltipTrigger asChild>
												{unit.website ? (
													<Button variant='secondary' asChild>
														<Link href={unit.website} target='_blank' rel='noopener'>
															URL
														</Link>
													</Button>
												) : (
													<p>NULL</p>
												)}
											</TooltipTrigger>
											<TooltipContent>
												<p>{unit.website}</p>
											</TooltipContent>
										</Tooltip>
									</TooltipProvider>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</section>
		</main>
	)
}
