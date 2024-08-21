import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function getLocalStorage(key: string, defaultValue: any) {
	if (typeof window === 'undefined' || !localStorage) return defaultValue

	const stickyValue = localStorage.getItem(key)
	return stickyValue !== null && stickyValue !== 'undefined' ? JSON.parse(stickyValue) : defaultValue
}

export function setLocalStorage(key: string, value: any) {
	if (!localStorage) return
	localStorage.setItem(key, JSON.stringify(value))
}

export function getFirstParamValue(param: string | string[] | undefined, fallback?: string): string | undefined {
	return (Array.isArray(param) ? param[0] : param) ?? fallback
}

export function deepEqual(object1: any, object2: any) {
	const keys1 = Object.keys(object1)
	const keys2 = Object.keys(object2)

	if (keys1.length !== keys2.length) {
		return false
	}

	for (const key of keys1) {
		const val1 = object1[key]
		const val2 = object2[key]
		const areObjects = isObject(val1) && isObject(val2)
		if ((areObjects && !deepEqual(val1, val2)) || (!areObjects && val1 !== val2)) {
			return false
		}
	}

	return true
}

export function isObject(object: any) {
	return object != null && typeof object === 'object'
}

export function isEmpty(object: any) {
	return Object.keys(object).length === 0
}

export const capitalize = (text: string) => text.charAt(0).toUpperCase() + text.slice(1)

export const placeholderImage = '/placeholder-image.jpg'

export function formatBytes(
	bytes: number,
	opts: {
		decimals?: number
		sizeType?: 'accurate' | 'normal'
	} = {}
) {
	const { decimals = 0, sizeType = 'normal' } = opts

	const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
	const accurateSizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB']
	if (bytes === 0) return '0 Byte'
	const i = Math.floor(Math.log(bytes) / Math.log(1024))
	return `${(bytes / Math.pow(1024, i)).toFixed(decimals)} ${
		sizeType === 'accurate' ? accurateSizes[i] ?? 'Bytest' : sizes[i] ?? 'Bytes'
	}`
}
