import { QualificationType } from '@prisma/client'

export const qualificationTypeOptions = [
	...Object.values(QualificationType).map(type => {
		const lowerCaseType = type.toLowerCase()
		const label = lowerCaseType.charAt(0).toUpperCase() + lowerCaseType.slice(1)

		return { label: label, value: type }
	})
]
