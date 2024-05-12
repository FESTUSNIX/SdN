import AddAccount from '../components/Sheets/account/AddAccount'
import AddMajor from '../components/Sheets/major/AddMajor'
import EditMajor from '../components/Sheets/major/EditMajor'
import AddQualification from '../components/Sheets/qualification/AddQualification'
import EditQualification from '../components/Sheets/qualification/EditQualification'
import AddSubscription from '../components/Sheets/subscription/AddSubscription'
import EditSubscription from '../components/Sheets/subscription/EditSubscription'
import AddUnit from '../components/Sheets/unit/AddUnit'
import EditUnit from '../components/Sheets/unit/EditUnit'

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
