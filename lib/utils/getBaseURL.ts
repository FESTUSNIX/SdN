const getBaseURL = (path: string) => {
	// if (process.env.NODE_ENV === 'development') {
	// 	return `${process.env.NEXT_PUBLIC_BASE_URL}`
	// }

	// return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
	return `${process.env.NEXT_PUBLIC_BASE_URL}${path}`
}
export default getBaseURL
