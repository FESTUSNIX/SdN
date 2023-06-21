const getBaseURL = () => {
	// if (process.env.NODE_ENV === 'development') {
	// 	console.log('URL-dev =============', `${process.env.NEXT_PUBLIC_BASE_URL || ''}`)
	// 	return process.env.NEXT_PUBLIC_BASE_URL || ''
	// }

	// console.log(
	// 	'URL-prod ===============',
	// 	process.env.NEXT_PUBLIC_VERCEL_URL ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}` : ''
	// )
	// return process.env.NEXT_PUBLIC_VERCEL_URL ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}` : ''

	console.log('URL ====', process.env.NEXT_PUBLIC_BASE_URL ?? '')
	return process.env.NEXT_PUBLIC_BASE_URL ?? ''
}
export default getBaseURL
