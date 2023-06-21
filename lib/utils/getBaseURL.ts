const getBaseURL = () => {
	if (process.env.NODE_ENV === 'development') {
		return `${process.env.NEXT_PUBLIC_BASE_URL}`
	}

	return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
}
export default getBaseURL
