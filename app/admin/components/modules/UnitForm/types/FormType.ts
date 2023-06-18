import { UseFormReturn } from 'react-hook-form'

export type form = UseFormReturn<
	{
		name: string
		logo: string
		isPublic: boolean
		unitType: 'uczelnia' | 'placówka doskonalenia nauczycieli' | 'inna'
		otherUnitType: string
		website: string
		street: string
		postalCode: string
		cityId: number
		nip?: string | undefined
		regon?: string | undefined
	},
	any,
	undefined
>
