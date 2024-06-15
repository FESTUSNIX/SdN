import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/app/components/ui/Tooltip'
import { CircleProgress } from '@/app/components/ui/progress'
import { Major } from '@prisma/client'

type Props = {
	data: Major
}

export const MajorCompletion = ({ data }: Props) => {
	const { id, slug, unitSlug, unitId, updatedAt, workStatus, contact, onlineDuration, formOfStudy, ...progressData } =
		data

	function calculateCompletion(data: any): number {
		let totalFields: any[] = []
		let completedFields: any[] = []

		function isComplete(value: any): boolean {
			return value !== null && value !== undefined && value !== '' && value.length !== 0
		}

		function traverse(obj: any): void {
			if (Array.isArray(obj)) {
				totalFields.push(obj)

				if (obj.length > 0) {
					completedFields.push(obj)
				}
			} else if (typeof obj === 'object' && obj !== null && !(obj instanceof Date)) {
				const keys = Object.keys(obj)

				if (keys.length === 0) {
					totalFields.push(obj)
				} else {
					keys.forEach(key => {
						console.log(key, obj[key])
						traverse(obj[key])
					})
				}
			} else {
				totalFields.push(obj)

				if (isComplete(obj)) {
					completedFields.push(obj)
				}
			}
		}

		traverse(data)

		if (totalFields.length === 0) return 100 // If no fields, consider it 100% complete

		return (completedFields.length / totalFields.length) * 100
	}

	const completionPercentage = Math.floor(calculateCompletion(progressData))

	return (
		<TooltipProvider>
			<Tooltip delayDuration={50}>
				<TooltipTrigger>
					<CircleProgress value={Number(completionPercentage)} className='h-12 w-12 text-sm' />
				</TooltipTrigger>
				<TooltipContent>
					<p>Kierunek jest wypełniony w {completionPercentage}%</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	)
}
