import AddAccount from './account/AddAccount'
import AddMajor from './major/AddMajor'
import EditMajor from './major/EditMajor'
import AddQualification from './qualification/AddQualification'
import EditQualification from './qualification/EditQualification'
import AddSubscription from './subscription/AddSubscription'
import EditSubscription from './subscription/EditSubscription'
import AddUnit from './unit/AddUnit'
import EditUnit from './unit/EditUnit'

export const SHEET_TYPES = [
	'ADD_UNIT',
	'EDIT_UNIT',
	'ADD_MAJOR',
	'EDIT_MAJOR',
	'ADD_QUALIFICATION',
	'EDIT_QUALIFICATION',
	'ADD_ACCOUNT',
	'CLOSE',
	'ADD_SUBSCRIPTION',
	'EDIT_SUBSCRIPTION'
] as const

export type SheetTypes = (typeof SHEET_TYPES)[number]

export const SHEETS: {
	[key in SheetTypes]: () => JSX.Element | null
} = {
	ADD_UNIT: AddUnit,
	EDIT_UNIT: EditUnit,
	ADD_MAJOR: AddMajor,
	EDIT_MAJOR: EditMajor,
	ADD_QUALIFICATION: AddQualification,
	EDIT_QUALIFICATION: EditQualification,
	ADD_ACCOUNT: AddAccount,
	ADD_SUBSCRIPTION: AddSubscription,
	EDIT_SUBSCRIPTION: EditSubscription,
	CLOSE: () => null
}
